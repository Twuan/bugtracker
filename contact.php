<?php
   session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form</title>
  <link rel="stylesheet" href="style_2.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
</head>

<body>

   <nav class="navbar">
      <div class="brand-title">BugTracker</div>
      <a href="#" class="toggle-button">
         <span class="bar"></span>
         <span class="bar"></span>
         <span class="bar"></span>
      </a>
      <div class="navbar-links" id="testhead">
         <ul class="nav-menu" id="test">
            <li><a href="welcome.php">Home</a></li>
            <?php
               if (isset($_SESSION['uid'])) {
                  echo "
                     <li><a href='tickets.php'>Tickets</a></li>
                     <li><a href='projects.php'>Projects</a></li>
                     <li><a href='users.php'>Users</a></li>
                     <li><a href='logout.php'>Logout</a></li>
                  ";
               }
               else {
                  echo "
                     <li><a href='login.php'>Login/Signup</a></li>
                  ";
               }
            ?>
            <li><a href="#">About</a></li>
            <li><a href="contact.php">Contact</a></li>
            <!-- <div class="animation animation-login start-home"></div> -->
         </ul>
         
      </div>
   </nav>

   <div class="body-contact">
      <div class="contact-wrapper">
         <header class="contact-header">Send us a Message</header>
         <form action="#" class="contact-form" id="contact-form" method="post">
            <div class="contact-double-field">
            <div class="contact-field">
               <input type="text" name="name" placeholder="Enter your name">
               <i class='fas fa-user'></i>
            </div>
            <div class="contact-field">
               <input type="text" name="email" placeholder="Enter your email">
               <i class='fas fa-envelope'></i>
            </div>
            </div>
            <div class="contact-double-field">
            <div class="contact-field">
               <input type="text" name="phone" placeholder="Enter your phone">
               <i class='fas fa-phone-alt'></i>
            </div>
            <div class="contact-field">
               <input type="text" name="website" placeholder="Enter your website">
               <i class='fas fa-globe'></i>
            </div>
            </div>
            <div class="message">
            <textarea placeholder="Write your message" name="message"></textarea>
            <i class="material-icons">message</i>
            </div>
            <div class="contact-button-field">
            <button type="submit">Send Message</button>
            <span class="contact-span"></span>
            </div>
         </form>
      </div>
   </div>

   <input type='hidden' name='process' value='contact' form='contact-form'>

  <script src="script_2.js"></script>

</body>
</html>
