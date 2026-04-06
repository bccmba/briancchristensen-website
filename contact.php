<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

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
    
    $from_name = !empty($name) ? $name : "Website Visitor";
    
    $headers = "From: " . $from_name . " <brian@briancchristensen.com>\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $email_subject = "Website Contact: " . $subject;
    $email_body = "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n\n";
    $email_body .= "Message:\n" . $message . "\n";

    $result = mail($to, $email_subject, $email_body, $headers);
    
    if ($result) {
        header("Location: /?sent=true");
        exit;
    } else {
        $error = error_get_last();
        http_response_code(500);
        echo "Failed to send email. Error: " . ($error ? $error['message'] : 'Unknown');
        
        // Also log to a file for debugging
        $log = date('Y-m-d H:i:s') . " - mail() failed. Error: " . ($error ? $error['message'] : 'Unknown') . "\n";
        file_put_contents('email_debug.log', $log, FILE_APPEND);
    }
} else {
    echo "Invalid request method";
}
?>