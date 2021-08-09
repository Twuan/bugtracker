<?php
   session_start();
	if (!isset($_SESSION['uid'])) {
		header("Location: login.php");
	}
?>
<?php
	define('BASEPATH', true);
	require 'connect.php';
?>


<!DOCTYPE html>
<html lang="en" class="html-home">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" media="screen" href="style_2.css" />
	<title>Home</title>
</head>

<body class="body-home">
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
				<li><a href="tickets.php">Tickets</a></li>
				<li><a href="projects.php">Projects</a></li>
            <li><a href="users.php">Users</a></li>
				<li><a href="logout.php">Logout</a></li>
				<li><a href="#">About</a></li>
				<li><a href="contact.php">Contact</a></li>
				<div class="animation animation-users start-home"></div>				
			</ul>
			
		</div>
	</nav>

	
	<?php
      // echo
      // "<form action='#' id='new-user-form' method='post'></form>";
      echo
      "<form action='#' id='edit-user-form' method='post'></form>";
      echo
      "<input type='hidden' name='process' value='new-user-save' form='new-user-form'>";
      echo
		"<div class='contents' id='contents'>";
			echo
      	"<form action='#' id='new-user-form' method='post'>
				<div class='title-field'>
					<div class='title'>Add New User</div>
				</div>
				<div class='field user-and-role-field'>
					<select name='new-user-user' class='new-user-user' required>
						<option value=''>--choose a user--</option>
					</select>
					<select name='new-user-role' class='new-user-role'>
						<option value=''>--choose a role--</option>
					</select>
				</div>
				<div class='field password'>
					<input type='password' name='new-user-temporary-password' class='new-user-temporary-password' placeholder='temporary password' required>
					<input type='password' name='new-user-confirm-temporary-password' class='new-user-confirm-temporary-password' placeholder='confirm password' required>
				</div>
				<div class='buttons'>
				 	<input type='submit' name='new-user-submit' class='new-user-submit' value='submit'>
				 	<button type='button' name='new-user-cancel' class='new-user-cancel'>cancel</button>
				</div>
			</form>";			
			echo
			"<div class='search-table'>";
			// Creates users table heading
				echo 
				"<input class='search-input' id='users-search' type='text'  placeholder='Search'>";
				echo
				"<h1>Users</h1>";
				echo 
				"<table class = 'table' id='user' border = '0'>";
					// echo 
					// "<caption class='caption'>users</caption>";
					echo 
					"<thead><tr><th><span class='th' >ID</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Name</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Email</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Role</span><span class='sort-arrow'></span></th>
					<th></th></tr></thead>\n";
					#echo "</table><br>"; // ends table
					

					// Creates users query and saves result
					$query = "select emp_id id, concat(first_name, ' ', last_name) name, email, role from users;";
					$result = $db->query($query);

					echo 
					"<tbody>\n";
						// prints table rows row by row
						foreach( $result as $column) {
							echo "
                     <tr class='row'>
                        <td class='id'>{$column["id"]}</td>
                        <td class='name'>{$column["name"]}</td>
                        <td class='email'>{$column["email"]}</td>
                        <td class='role'>{$column["role"]}</td>
                        <td class='button'>
                           <input class='edit-user' type='button' value='edit'>                           
                           <input class='edit-user-submit' type='submit' value='submit' form='edit-user-form'>
                           <span class='edit-user-confirm'>submit?</span>
                           <button class='edit-user-yes' type='button'>yes</button>
                           <button class='edit-user-no' type='button'>no</button>
                           <input class='edit-user-cancel' type='button' value='cancel'>
                     ";
							if ($_SESSION['role'] == 'admin')
								echo "
										<button class='delete' type='button'>delete</button>
										<span class='delete-confirm'>delete?</span>
										<button class='delete-yes' type='button'>yes</button>
										<button class='delete-no' type='button'>no</button>
								";
							echo "
                        </td>
                     </tr>";
						}
					echo 
					"</tbody>\n";
				echo 
				"</table>";  // ends table
				// echo
				// "<button id='add-user' class='add-row' type='button'>add user</button>";
			echo 
			"</div>";
		echo
		"</div>";
		
	?>
	<script src="script_2.js"></script>

</body>
</html>



