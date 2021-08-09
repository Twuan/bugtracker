<?php
   session_start();
?>

<!DOCTYPE html>
<html lang="en" class="html-welcome">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" type="text/css" media="screen" href="style_2.css" />
   <title>Welcome</title>
</head>
<body class="body-welcome">
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
            <div class="animation animation-welcome start-home"></div>				
         </ul>
         
      </div>
   </nav>
   <div class="body-welcome-content">
      <h1 class="h1-test">Bug Tracker</h1>
   </div>

   <script src="script_2.js"></script>
   
</body>
</html>