<div class="contact-form <?php if(!isset($emailSent) && $emailSent != true): ?>hide<?php endif; ?>" id="successMessage">
    <h2 class="retro">Thank you!</h2>
    <p><strong>Your email has been sent successfully.</strong> We will answer you as soon as possible.</p>
</div>

<?php if(!isset($emailSent) && $emailSent != true): ?>

    <form class="contact-form" id="contactForm" method="post" action="contact.php">
        <div>
            <h3 class="retro">Got a project?</h3>
        </div>

        <?php if(isset($hasError) || isset($captchaError)): ?>
            <div class="label-left">
                <p class="error-label">An error has occured sending the message. Please try again.</p>
            </div>
        <?php endif; ?>

        <div class="label-left">
            <?php if($firstnameError != ''): ?>
                <span class="error-field"><?=$firstnameError;?></span>
            <?php endif; ?>
            <label for="firstname">Firstname</label>
            <input type="text" placeholder="Firstname" name="firstname" id="firstname" class="required">
        </div>

        <div class="label-left">
            <?php if($lastnameError != ''): ?>
                <span class="error-field"><?=$lastnameError;?></span>
            <?php endif; ?>
            <label for="lastname">Lastname</label>
            <input type="text" placeholder="Lastname" name="lastname" id="lastname" class="required">
        </div>

        <div class="label-left">
            <?php if($emailError != ''): ?>
                <span class="error-field"><?=$emailError;?></span>
            <?php endif; ?>
            <label for="email">Email</label>
            <input type="text" placeholder="Email" name="email" id="email" class="email required">
        </div>

        <div class="label-left">
            <label for="phone">Phone</label>
            <input type="text" placeholder="Phone" name="phone" id="phone">
        </div>

        <div class="label-left">
            <?php if($messageError != ''): ?>
                <span class="error-field"><?=$messageError;?></span>
            <?php endif; ?>
            <label for="message">Message</label>
            <textarea placeholder="Message" name="message" id="message" class="required"></textarea>
        </div>
        
        <div class="hide">
            <label for="checking" class="screenReader">Anti-spam: if you wish send this message, leave this field empty.</label>
            <input type="text" name="checking" id="checking" class="screenReader" value="<?php if(isset($_POST['checking']))  echo $_POST['checking'];?>" />
        </div>

        <input type="hidden" name="submitted" id="submitted" value="true" />
        <input type="submit" class="btn pull-right" id="contact-submit" value="Send">
    </form>

<?php endif; ?>