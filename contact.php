<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = strip_tags(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = strip_tags(trim($_POST["message"]));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        exit;
    }

    $to      = "brian@briancchristensen.com";
    $headers = "From: $name <$email>\r\nReply-To: $email\r\n";

    mail($to, $subject, $message, $headers);
    header("Location: /?sent=true");
    exit;
}
?>
