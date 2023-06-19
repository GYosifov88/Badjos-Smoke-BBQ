<?php

$to = "mail@example.com";
$from = "mail@example.com";

$headers = "From: " . $from . "\r\n";

$subject = $_POST['msg_subject'];
$body = $_POST['msg_subject'] . "\r\n\r\n";

$body .= "E-mail: " . $_POST['email'] . "\r\n";

if ($_POST['field_']) {
	foreach ($_POST['field_'] as $key => $item) {
		if ($item != ' ') {
			$body .= "Field " . $key . ": " . $item . "\r\n";
		}
	}
}


if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
	if (mail($to, $subject, $body, $headers, "-f " . $from)) {
		$message = 'OK';
	} else {
		$errors = 'Error';
		echo json_encode(array('errors' => $errors));
		exit;
	}
} else {
	$errors = 'Error';
	echo json_encode(array('errors' => $errors));
	exit;
}

echo json_encode(array('msg' => $message));
exit;