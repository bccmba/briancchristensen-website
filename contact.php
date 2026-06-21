<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // ── Honeypot check — bots fill the hidden field, humans don't ──────────
    if (!empty($_POST["website"])) {
        // Silent rejection: looks like success to the bot
        header("Location: /?sent=true");
        exit;
    }

    // ── Sanitize inputs ─────────────────────────────────────────────────────
    // Strip tags AND carriage returns/newlines to prevent mail header injection
    $name    = str_replace(["\r", "\n"], '', strip_tags(trim($_POST["name"] ?? '')));
    $subject = str_replace(["\r", "\n"], '', strip_tags(trim($_POST["subject"] ?? '')));
    $email   = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST["message"] ?? ''));

    // ── Validate ─────────────────────────────────────────────────────────────
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email address.";
        exit;
    }

    if (empty($name) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo "All fields are required.";
        exit;
    }

    // ── Build mail ───────────────────────────────────────────────────────────
    $to         = "brian@briancchristensen.com";
    $from_name  = !empty($name) ? $name : "Website Visitor";

    $headers  = "From: " . $from_name . " <brian@briancchristensen.com>\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $email_subject = "Website Contact: " . $subject;
    $email_body    = "Name: "    . $name    . "\n";
    $email_body   .= "Email: "   . $email   . "\n\n";
    $email_body   .= "Message:\n" . $message . "\n";

    $result = mail($to, $email_subject, $email_body, $headers);

    if ($result) {
        header("Location: /?sent=true");
        exit;
    } else {
        // Log to sys temp dir (outside webroot) — never echo the raw error to the visitor
        $error   = error_get_last();
        $log_msg = date('Y-m-d H:i:s') . " - mail() failed. Error: "
                 . ($error ? $error['message'] : 'Unknown') . "\n";
        $log_path = sys_get_temp_dir() . '/briancchristensen_mail.log';
        file_put_contents($log_path, $log_msg, FILE_APPEND | LOCK_EX);

        http_response_code(500);
        echo "Sorry, your message could not be sent. Please try emailing brian@briancchristensen.com directly.";
    }

} else {
    http_response_code(405);
    echo "Method not allowed.";
}
?>
