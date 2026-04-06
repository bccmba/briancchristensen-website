<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = strip_tags(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = strip_tags(trim($_POST["message"]));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email address";
        exit;
    }

    $to = "brian@briancchristensen.com";
    
    $headers = "From: $name <brian@briancchristensen.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $email_subject = "Website Contact: $subject";
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n\n";
    $email_body .= "Message:\n$message\n";

    if (mail($to, $email_subject, $email_body, $headers)) {
        header("Location: /?sent=true");
        exit;
    } else {
        http_response_code(500);
        echo "Failed to send email. Please try again or email directly.";
    }
}
?>