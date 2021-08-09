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
				<li><a href="contacts.php">Contact</a></li>
				<div class="animation animation-projects start-home"></div>				
			</ul>
			
		</div>
	</nav>

	
	<?php
      echo
      "<form action='#' id='new-project-form' method='post'></form>";
      echo
      "<form action='#' id='edit-project-form' method='post'></form>";
      echo
      "<input type='hidden' name='process' value='new-project-save' form='new-project-form'>";
      echo
		"<div class='contents' id='contents'>";			
			echo
			"<div class='search-table'>";
			// Creates projects table heading
				echo 
				"<input class='search-input' id='projects-search' type='text'  placeholder='Search'>";
				echo
				"<h1>Projects</h1>";
				echo 
				"<table class = 'table' id='projects' border = '0'>";
					// echo 
					// "<caption class='caption'>Projects</caption>";
					echo 
					"<thead><tr><th><span class='th'>ID</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Project</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Date created</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Manager</span><span class='sort-arrow'></span></th>
					<th><span class='th'>Description</span><span class='sort-arrow'></span></th>
					<th></th></tr></thead>\n";
					#echo "</table><br>"; // ends table
					

					// Creates projects query and saves result
					$query = "select id, project, date(date_created), manager_id, manager, description from projects_v;";
					$result = $db->query($query);

					echo 
					"<tbody>\n";
						// prints table rows row by row
						foreach( $result as $column) {
							echo "
                     <tr class='row'
                        ><td class='id'>{$column["id"]}</td>
                        <td class='project projects-project e2'>{$column["project"]}</td>
                        <td class='date'>{$column["date(date_created)"]}</td>
                        <td class='manager' data-manager-id='{$column["manager_id"]}'>{$column["manager_id"]}-{$column["manager"]}</td>
                        <td class='description'>{$column["description"]}</td>
                        <td class='button'>
                           <input class='edit-project' type='button' value='edit'>                           
                           <input class='edit-project-submit' type='submit' value='submit' form='edit-project-form'>
                           <span class='edit-project-confirm'>submit?</span>
                           <button class='edit-project-yes' type='button'>yes</button>
                           <button class='edit-project-no' type='button'>no</button>
                           <input class='edit-project-cancel' type='button' value='cancel'>
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
				echo
				"<button id='add-project' class='add-row' type='button'>add project</button>";
			echo
			"</div>";
		echo
		"</div>";
		
	?>
	<script src="script_2.js"></script>

</body>
</html>



