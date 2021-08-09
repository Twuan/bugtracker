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
				<div class="animation animation-tickets start-home"></div>				
			</ul>			
		</div>
	</nav>

	
	<?php
		
		// // defines database info	
		// $dsn = 'mysql:host=localhost:3306;dbname=bugtracker;charset=utf8';
		// $user = 'root';
		// $password = 'root';
		
		// try {
		// 	// create the PDO client
		// 	$db = new PDO($dsn, $user, $password);
		// } 
		// catch(PDOException $e) {
		// 	die("Connection error!");
		// }
		// #echo "You have connected to database successfully!<br><br>";
		
		// // echo "<br><br>";
		
		// require 'connect.php';

		echo
		"<form action='#' id='new-ticket-form' method='post'></form>";
      echo
      "<form action='#' id='edit-ticket-form' method='post'></form>";
		echo
		"<input type='hidden' name='process' value='new-ticket-save' form='new-ticket-form'>";
		echo
		"<div class='contents' id='contents'>";
			echo
			"<div class='search-table tickets-search-table'>";
				echo 
				"<input class='search-input' id='tickets-search' type='text' placeholder='Search...'>";
				echo
				"<h1>Tickets</h1>";
            // echo
				// "<button id='add-ticket' class='add-row' type='button'>add ticket</button>";

				// Creates tickets table heading
				echo 
				"<table class='table' id='tickets' border = '0'>";
					// echo 
					// "<caption class='caption'>Tickets</caption>";
					echo 
					"<thead><tr><th><span class='th'>ID</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Project</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Date created</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Submitter</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Type</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Priority</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Description</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Status</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Assigned Technician</span><span class='sort-arrow'></span></th>
					<th></th></tr></thead>\n";
					#echo "</table><br>"; // ends table
				
					try {
						// Creates tickets query and saves result
						$query = "select id, project_id, project, submitter_id, submitter, date(date_created), ticket_type, priority, description, status, assigned_technician_id, assigned_technician from tickets_v";
						$result = $db->query($query);
					}
					catch (PDOException $e) {
                  // echo('error: ' . $e);
						die("Connection error!");
					}

					echo 
					"<tbody>\n";
						// prints table rows row by row
						foreach( $result as $column) {
							echo "
                     <tr class='row'>
                        <td class='id'>{$column["id"]}</td>
                        <td class='project e2' data-project-id='{$column["project_id"]}'>{$column["project_id"]}-{$column["project"]}</td>
                        <td class='date'>{$column["date(date_created)"]}</td>
                        <td class='submitter'>{$column["submitter_id"]}-{$column["submitter"]}</td>
                        <td class='ticket_type e2'>{$column["ticket_type"]}</td>
                        <td class='priority e e2'>{$column["priority"]}</td>
                        <td class='description e e2'>{$column["description"]}</td>
                        <td class='status e e2'>{$column["status"]}</td>
                        <td class='assigned-technician e e2' data-assigned-technician-id='{$column["assigned_technician_id"]}'>{$column["assigned_technician_id"]}-{$column["assigned_technician"]}</td>
                        
                        <td class='button'>
                           <input class='edit-ticket' type='button' value='edit'>                           
                           <input class='edit-ticket-submit' type='submit' value='submit' form='edit-ticket-form'>
                           <span class='edit-ticket-confirm'>submit?</span>
                           <button class='edit-ticket-yes' type='button'>yes</button>
                           <button class='edit-ticket-no' type='button'>no</button>
                           <input class='edit-ticket-cancel' type='button' value='cancel'>
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
					// echo
					// "<tr><td><button type='button'>add ticket</button></td></tr>\n";
					echo 
					"</tbody>\n";
				echo 
				"</table>";  // ends table
				echo
				"<button id='add-ticket' class='add-row' type='button'>add ticket</button>";
			echo
			"</div>";
		
			//echo "<br><br><br>";  // extra lines
			
			//echo("end page.php<br>");
      echo
      "</div>"
		
	?>
	<script src="script_2.js"></script>

</body>
</html>




