<?php 
// Based on the work of Trevor Davis
// http://trevordavis.net/blog/wordpress-jquery-contact-form-without-a-plugin

// Email configuration
$siteName = 'bulb HTML template';
$emailTo = 'your@email.com';
// Leave empty if you don't want to send a CC
$emailCC = '';
$subject = 'You received a message from ' . $siteName;

// Error messages
$firstnameErrorMessage = '<strong>Firstname</strong> field is required';
$lastnameErrorMessage = '<strong>Lastname</strong> field is required';
$emailErrorMessage = '<strong>Email</strong> field is required';
$emailValidError = 'Your <strong>Email</strong> is not valid';
$messageErrorMessage = '<strong>Message</strong> is empty';

// If the form is submitted
if(isset($_POST['submitted'])) {

    //Check to see if the honeypot captcha field was filled in
    if(trim($_POST['checking']) !== '') {

        $captchaError = true;

    } else {
    
        //Check to make sure that the name field is not empty
        if(trim($_POST['firstname']) === '') {
            $firstnameError = $firstnameErrorMessage;
            $hasError = true;
        } else {
            $firstname = trim($_POST['firstname']);
        }
        
        if(trim($_POST['lastname']) === '') {
            $lastnameError = $lastnameErrorMessage;
            $hasError = true;
        } else {
            $lastname = trim($_POST['lastname']);
        }
        
        //Check to make sure sure that a valid email address is submitted
        if(trim($_POST['email']) === '')  {
            $emailError = $emailErrorMessage;
            $hasError = true;
        } else if (!eregi("^[A-Z0-9._%-]+@[A-Z0-9._%-]+\.[A-Z]{2,4}$", trim($_POST['email']))) {
            $emailError = $emailValidError;
            $hasError = true;
        } else {
            $email = trim($_POST['email']);
        }

        //Check to make sure message were entered  
        if(trim($_POST['message']) === '') {
            $messageError = $messageErrorMessage;
            $hasError = true;
        } else {
            if(function_exists('stripslashes')) {
                $message = stripslashes(trim($_POST['message']));
            } else {
                $message = trim($_POST['message']);
            }
        }
            
        //If there is no error, send the email
        if(!isset($hasError)) {

            $phone = trim($_POST['phone']);
                
            $body = "Firstname: $firstname \n\nLastname: $lastname \n\nEmail: $email \n\nPhone: $phone \n\nMessage: $message";
            $headers = 'From: ' . $siteName . ' <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $email;
            
            mail($emailTo, $subject, $body, $headers);
            
            // Send to CC
            if($emailCC != '') {
                mail($emailCC, $subject, $body, $headers);
            }

            $emailSent = true;
        }
    }
} ?>