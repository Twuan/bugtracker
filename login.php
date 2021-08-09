<?php
	define('BASEPATH', true);
	require 'connect.php';
?>

<!DOCTYPE html>
<html lang="en" class="html-login">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <link rel="stylesheet" type="text/css" media="screen" href="style_2.css" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
</head>
<body class="body-login">
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
				<!-- <li><a href="#">Dashboard</a></li>
				<li><a href="tickets.php">Tickets</a></li>
				<li><a href="projects.php">Projects</a></li> -->
				<li><a href="login.php">Login/Signup</a></li>
				<li><a href="#">About</a></li>
				<li><a href="contact.php">Contact</a></li>
				<!-- <div class="animation animation-login start-home"></div> -->
			</ul>
			
		</div>
	</nav>

   <div class="body-login2">
      <div class="wrapper">
         <div class="title-text">
            <div class="title login">Login Form</div>
            <div class="title signup">Signup Form</div>            
         </div>         
         <div class="form-container">
            <div class="slide-controls">
               <input type="radio" name="slider" id="login" checked></label>
               <input type="radio" name="slider" id="signup"></label>
               <label for="login" class="slide login">Login</label>
               <label for="signup" class="slide signup">Signup</label>
               <div class="slide-tab"></div>
            </div>
            <div class="form-inner">
               <form action="#" class="login" method="post">
                  <div class="field"  id="login-uid">
                     <input class="login-uid" name="login-uid" type="text" placeholder="Username or email" required>                  
                  </div>
                  <div class="field">
                     <input class="login-password" name="login-password" type="password" placeholder="Password" required>
                  </div>
                  <div class="pass-link"><a href="#">Forgot password?</a></div>
                  <div class="field">
                     <input class="login-button" type="submit" value="Login">
                  </div>
                  <div class="signup-link">Not a member? <a href="#">Signup now</a></div>   
               </form>

               <form action="#" class="signup"  method="post">
                  <div class="field">
                     <input class="signup-uid" name="signup-uid" type="text" placeholder="Username or email" required>                  
                  </div>
                  <div class="field">
                     <input class="signup-temporary-password" name="signup-temporary-password" type="password" placeholder="Temporary password" required>                  
                  </div>
                  <div class="field">
                     <input class="signup-password" name="signup-password" type="password" placeholder="Password" required>
                  </div>
                  <div class="field">
                     <input class="signup-confirm-password" name="signup-confirm-password" type="password" placeholder="Comfirm password" required>
                  </div>
                  <div class="field">
                     <input class="signup-button" type="submit" value="Signup">
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
   <!-- <script>
      const loginForm = document.querySelector("form.login");
      const signupForm = document.querySelector("form.signup");
      const loginBtn = document.querySelector("label.login");
      const signupBtn = document.querySelector("label.signup");
      const signupLink = document.querySelector(".signup-link a");
      const loginText = document.querySelector(".title-text .login");
      const signupText = document.querySelector(".title-text .signup");
      signupBtn.onclick = (()=>{
         loginForm.style.marginLeft = "-50%";
         loginText.style.marginLeft = "-50%";
      });
      loginBtn.onclick = (()=>{
         loginForm.style.marginLeft = "0%";
         loginText.style.marginLeft = "0%";
      });
      signupLink.onclick = (()=>{
         signupBtn.click();
         return false;
      });      
   </script> -->
   <script src="script_2.js"></script>
</body>
</html>