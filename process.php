<?php   
      
   define('BASEPATH', true);
	require 'connect.php';

   if (isset($_POST['process']) && $_POST['process'] == 'checkAccess') {
      $reply = [
         "error" => '',
         "loggedIn" => false,
         "role" => null,
         "test" => null
      ];
      
      try {
         session_start();
         if (!isset($_SESSION['uid'])) {
            // $reply['test'] = 1;
            echo json_encode($reply);                        
         }
         else {
            $stmt = $db->prepare("select role from users where username = :uid or email = :uid");
            $stmt->bindValue(':uid', $_SESSION['uid']);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row != false) {
               $reply['loggedIn'] = true;
               $reply['role'] = $row['role'];
               echo json_encode($reply);
            }
            
         }
      }
      catch (PDOException $e) {
         $reply['error'] += 'Error!';
      }
   }


   if (isset($_POST['process']) && $_POST['process']=='save') {

      try {
         
         $table = $_POST['table'];
         $field = $_POST['field'];
         $stmt = $db->prepare("update " . $table . " set " . $field . " = :value where id = :id");
         $stmt->bindParam(':value', $value);
         $stmt->bindParam(':id', $id);
         
         $value = $_POST['value'];
         $id = $_POST['id'];
         //$stmt->debugDumpParams();
         $stmt->execute();
         print_r("Success!");
      }
      catch (PDOException $e) {
         die("Save error!");
         //die($e);
      }
   }
   else if (isset($_POST['process']) && $_POST['process'] == 'delete') {
      try {
         
         $table = $_POST['table'];
         $id = $_POST['id'];
         $stmt = $db->prepare("delete from " . $table . " where id = " . $id);
         $stmt->execute();
         print_r("Success!");
      }
      catch (PDOException $e) {
         die("Delete error!");
         //die($e);
      }
   }

   else if (isset($_POST['process']) && $_POST['process'] == 'login') {
      try {
         $response['error'] = '';
         $response['message'] = '';
         $response['loggedIn'] = false;
         $response['data'] = null;

         $uid = $_POST['loginUid'];
         $password = $_POST['loginPassword'];
         $stmt = $db->prepare("select emp_id, password, role, access from users where username = :uid or email = :uid");
         $stmt->bindValue(':uid', $uid);
         $stmt->execute();
         $row = $stmt->fetch(PDO::FETCH_ASSOC);

         // Checks if a row returned
         if ($row == false) {
            $response['error'] .= "Incorrect user id or password!\n";
         }
         // Checks if username exists and if password matches
         else if (!count($row) > 0 || strcmp($row['password'], $password) != 0 || strcmp($row['access'], 'active') != 0) {
            $response['error'] .= "Incorrect user id or password!\n";
         }
         else {
            $response['data'] = $row['role'];
            session_start();
            $_SESSION['empId'] = $row['emp_id'];
            $_SESSION['uid'] = $uid;
            $_SESSION['role'] = $row['role'];
            $response['loggedIn'] = true;
            $response['message'] .= "Successfully logged in!\n";
            // header('Location: welcome.php');
         }
         // $response['data'] = $row['role'];
         echo json_encode($response);
      }
      catch(PDOException $e){
         // $error = "Error: " . $e->getMessage();
         $response['error'] .= "Error!\n";
         echo json_encode($response);
      }
   }

   else if (isset($_POST['process']) && $_POST['process'] == 'signup') {
      try {
         $response['error'] = '';
         $response['message'] = '';
         $response['data'] = null;

         // checks for username
         $uid = $_POST['signupUid'];
         $temporaryPassword = $_POST['signupTemporaryPassword']; // from user
         $password = $_POST['signupPassword'];
         $passwordConfirmation = $_POST['signupConfirmPassword'];
         $query1 =
            "select *, count(username) from
               (select username, email, access from users where username = :uid or email = :uid) employees
            natural join
               (select password temporary_password from temporary_passwords
                  where username = 
                     (select username from users where username = :uid or email = :uid)) temporary_passwords
            where username = :uid or email = :uid
            group by username";
         $stmt = $db->prepare($query1);
         $stmt->bindValue(':uid', $uid);
         $stmt->execute();
         $row = $stmt->fetch(PDO::FETCH_ASSOC);
         // echo "<br><br><br>";
  
         if ($row === false) {  
            $response['error'] .= "User id or temporary password invalid.\n";           
         }
         // checks if temporary password given matches the one given from database
         else if (strcmp($temporaryPassword, $temporary_password = $row['temporary_password']) != 0) {
            $response['error'] .= "User id or temporary password invalid.\n";
         }
         // checks if new passwords given match
         else if (strcmp($password, $passwordConfirmation) != 0) {
            $response['error'] .= "New passwords don\'t match\n";
         }
         // else adds new password to table
         else {
            try {
               // Saves query results
               $username = $row['username'];
               // $temporary_password = $row['temporary_password']; // from database
               $level = $row['access'];

               // inserts new password into table
               $query2 = "update users set password = :password, access = 'active' where username = '" . $username . "'";
               $stmt = $db->prepare($query2);
               $stmt->bindValue(':password', $password);
               $stmt->execute();

               // deletes temporary data
               $query3 = "delete from temporary_passwords where username = '" . $username . "'";
               $db->query($query3);

               // send notice of success
               $response['message'] .= 'Account activated successfully!\n';
               header('Location: welcome.php');
            }
            catch(PDOException $e){
               // $error = "Error: " . $e->getMessage();
               $response['error'] .= "Invalid credentials!\n";
               // echo '<script type="text/javascript">alert("'.$error.'");</script>';
               // header('Location: login.php');
            }
         }         

      }
      catch(PDOException $e){
         // $error = "Error: " . $e->getMessage();
         $error = 'Invalid credentials!';
         echo '<script type="text/javascript">alert("'.$error.'");</script>';
         header('Location: login.php');
      }
   }
   // *new edits
   if (isset($_POST['process']) && $_POST['process'] == 'saveNewTicket') {
      session_start();

      // get all the variables
      $projectId = $_POST['projectId'];
      $type = $_POST['type'];
      $priority = $_POST['priority'];

      // *new edits
      $submitter;
      $description = $_POST['description'];
      $status = $_POST['status'];
      $assignedTechnician = !isset($_POST['assignedTechnician']) || $_POST['assignedTechnician'] == '' ? null : $_POST['assignedTechnician'];

      try {
         // *needs editing - need to add submitter
         $query = "insert into tickets (project_id, submitter_id, ticket_type, priority, description, status, assigned_technician_id) values (:projectId, :submitter, :type, :priority, :description, :status, :assignedTechnician)";
         $stmt = $db->prepare($query);
         $stmt->bindValue(':projectId', $projectId);
         $stmt->bindValue(':submitter', $_SESSION['empId']);
         $stmt->bindValue(':type', $type);
         $stmt->bindValue(':priority', $priority);
         $stmt->bindValue(':description', $description);
         $stmt->bindValue(':status', $status);
         $stmt->bindValue(':assignedTechnician', $assignedTechnician);
         $stmt->execute();
         $id = $db->lastInsertId();
         $newRow = $db->query("select id, project_id, project, date(date_created), submitter_id, submitter, ticket_type, priority, description, status, assigned_technician_id, assigned_technician from tickets_v where id = '" . $id . "'");
         $newRow = $newRow->fetch(PDO::FETCH_ASSOC);

         echo json_encode($newRow);
         
      }
      catch(PDOException $e){
         // $error = "Error: " . $e->getMessage();
         // echo $error;
         // echo 'Save Error!';

         $array['error'] = 'Save Error!';
         // $array["error"] = $e->getMessage();
         echo json_encode($array);
      }
   }

   // *new edits
   else if (isset($_POST['process']) && $_POST['process'] == 'saveNewProject') {
      // get all the variables
      $projectName = $_POST['projectName'];
      $managerId = $_POST['manager'];
      $description = $_POST['description'];

      try {
         $query = "insert into projects (project, manager_id, description) values (:projectName, :managerId, :description)";
         $stmt = $db->prepare($query);
         $stmt->bindValue(':projectName', $projectName);
         $stmt->bindValue(':managerId', !isset($_POST['manager']) || $_POST['manager'] == '' ? null : $managerId);
         $stmt->bindValue(':description', !isset($_POST['description']) || $_POST['description'] == '' ? null : $description);
         $stmt->execute();
         $id = $db->lastInsertId();
         $newRow = $db->query("select id, project, date(date_created) date, manager_id, manager, description from projects_v where id = '" . $id . "'");
         $newRow = $newRow->fetch(PDO::FETCH_ASSOC);
         // echo 'Success!';
         echo json_encode($newRow);
         
      }
      catch(PDOException $e){

         $array['error'] = 'Save Error!';
         // $array["error"] = $e->getMessage();
         echo json_encode($array);
      }

      // echo 'Success!';
   }
   else if (isset($_POST['process']) && $_POST['process'] == 'getProjectIdsAndNames') {
      try {
         $query = "select id, project from projects";
         $projects = $db->query($query);

         $projects = $projects->fetchAll();
         echo json_encode($projects);
      }
      catch(PDOException $e){
         echo 'Error!';
      }
   }
   // *new edits
   else if (isset($_POST['process']) && $_POST['process'] == 'editTicket') {
      $array = [
         "error" => null,
         "data" => null
      ];

      $id = $_POST['id'];
      $projectId = $_POST['projectId'];
      $type = $_POST['type'];
      $priority = $_POST['priority'];
      $description = $_POST['description'];
      $status = $_POST['status'];
      $assignedTechnician = !isset($_POST['assignedTechnician']) || $_POST['assignedTechnician'] == '' ? null : $_POST['assignedTechnician'];

      try {
         $query = "update tickets set project_id = :projectId, ticket_type = :type, priority = :priority, description = :description, status = :status, assigned_technician_id = :assignedTechnician where id = :id";

         $stmt = $db->prepare($query);
         $stmt->bindValue(':id', $id);
         $stmt->bindValue(':projectId', $projectId);
         $stmt->bindValue(':type', $type);
         $stmt->bindValue(':priority', $priority);
         $stmt->bindValue(':description', $description);
         $stmt->bindValue(':status', $status);
         $stmt->bindValue(':assignedTechnician', $assignedTechnician);
         $stmt->execute();

         $query = "select id, project_id, project, date(date_created), submitter, ticket_type type, priority, description, status, assigned_technician_id, assigned_technician from tickets_v where id = :id";
         $stmt = $db->prepare($query);
         $stmt->bindValue(':id', $id);
         $stmt->execute();

         $newRow = $stmt->fetch(PDO::FETCH_ASSOC);

         $array["data"] = $newRow;
         echo json_encode($array);
      }
      catch(PDOException $e){
         $array['error'] = 'Save Error!';
         // $array["error"] = $e->getMessage();
         echo json_encode($array);
      }
   }

// for contact form
   else if (isset($_POST['process']) && $_POST['process'] == 'contact') {
      $name = htmlspecialchars($_POST['name']);
      $email = htmlspecialchars($_POST['email']);
      $phone = htmlspecialchars($_POST['phone']);
      $website = htmlspecialchars($_POST['website']);
      $message = htmlspecialchars($_POST['message']);

      if(!empty($email) && !empty($message)){
         if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            $receiver = "email";
            $subject = "From: $name <$email>";
            $body = "Name: $name\nEmail: $email\nPhone: $phone\nWebsite: $website\n\nMessage:\n$message\n\nRegards,\n$name";
            $sender = "From: $email";
            if(mail($receiver, $subject, $body, $sender)){
               echo "Your message has been sent";
            }else{
               echo "Message sending failed!";
            }
         }else{
            echo "Enter a valid email address!";
         }
      }else{
         echo "Email and message field is required!";
      }
   }

   else if (isset($_POST['process']) && $_POST['process'] == 'editProject') {
      $id = $_POST['id'];
      $project = $_POST['project'];
      $manager = $_POST['manager'];
      $description = $_POST['description'];

      $array['error'] = null;
      $array['data'] = null;
      $array['managerId'] = $_POST['manager'];

      try {
         $query = "update projects set project = :project, manager_id = :managerId, description = :description where id = :id";

         $stmt = $db->prepare($query);
         $stmt->bindValue(':id', $id);
         $stmt->bindValue(':project', $project);
         $stmt->bindValue(':managerId', !isset($_POST['manager']) || $_POST['manager'] == '' ? null : $manager);
         $stmt->bindValue(':description', !isset($_POST['description']) || $_POST['description'] == '' ? null : $description);
         $stmt->execute();


         $query = "select date(date_created), id, project, manager_id, manager, description from projects_v where id = :id";
         $stmt = $db->prepare($query);
         $stmt->bindValue(':id', $id);
         $stmt->execute();

         $newRow = $stmt->fetch(PDO::FETCH_ASSOC);
         
         $array["data"] = $newRow;         
         echo json_encode($array);
      }
      catch(PDOException $e){
         $error = "Error: " . $e->getMessage();
         echo $error;
         // $array['error'] = 'Save Error!';
      }

   }
   else if (isset($_POST['process']) && ($_POST['process'] == 'getUsers')) {
      try {
         $users['error'] = null;
         $users['data'] = null;
         $query = "select emp_id id, concat(first_name, ' ', last_name) manager from users";
         $data = $db->query($query);

         $users['data'] = $data->fetchAll();
         echo json_encode($users);
      }
      catch(PDOException $e){
         $users['error'] == 'Error!';
         echo json_encode($users);
      }
   }

   else if (isset($_POST['process']) && ($_POST['process'] == 'getRoles')) {
      try {
         $roles['error'] = null;
         $roles['data'] = null;
         $query = "select role from roles";
         $data = $db->query($query);

         $roles['data'] = $data->fetchAll();
         echo json_encode($roles);
      }
      catch(PDOException $e){
         $roles['error'] == 'Error!';
         echo json_encode($roles);
      }
   }
   else if (isset($_POST['process']) && $_POST['process'] == 'editUser') {
      $id = $_POST['id'];
      $role = $_POST['role'];

      $array['error'] = null;
      $array['data'] = null;
 
      try {
         $query = "update users set role = :role where emp_id = :id";

         $stmt = $db->prepare($query);
         $stmt->bindValue(':id', $id);
         $stmt->bindValue(':role', $role);
         $stmt->execute();

         $array['error'] = null;
         $array['data'] = null;
         $query = "select * from users where emp_id = :id";
         $stmt = $db->prepare($query);
         $stmt->bindValue(':id', $id);
         $stmt->execute();
         $newRow = $stmt->fetch(PDO::FETCH_ASSOC);
         
         $array["data"] = $newRow;         
         echo json_encode($array);
      }
      catch(PDOException $e){
         // $error = "Error: " . $e->getMessage();
         // echo $error;
         $array['error'] = 'Save Error!';
         echo $array;
      }

   }

   // Code for generating automatic usernames
   // try {
   //    $username['error'] = null;
   //    $username['data'] = null;
   //    $firstName = 'Bruce';
   //    $lastName = 'Wayne';
   //    $phone = $_POST['phone'];
   //    $address = $_POST['address'];
   //    $city = $_POST['city'];
   //    $state = $_POST['state'];
   //    $zip = $_POST['zip'];
   //    $role = $_POST['role'];
   //    $query = "select username from users where username rlike '(?<=^wayneb)[0-9]*$'";
   //    $data = $db->query($query);
   //    $username['data'] = $data->fetchAll(PDO::FETCH_ASSOC);

   //    $max = 0;.
   //    if (count($username['data'])) {         
   //       for ($i = 0; $i < count($username['data']); $i++) {
   //          preg_match('/(?<=^wayneb)[0-9]*$/i', $username['data'][$i]['username'], $matches);
   //          // print_r(json_encode($matches));
   //          if (!Empty($matches)) {
   //             $max = $max < intval($matches[0]) ? intval($matches[0]) : $max;
   //          }
   //       }          
   //    }

   //    $username = "wayneb" . ($max == 0 ? "" : $max + 1);
   //    print_r($username);
   //    echo "<br>";     
   // }
   // catch(PDOException $e){
   //    // $username['error'] == 'Error!';
   //    // echo json_encode($users);
   //    $username['error'] == $e;
   //    // print_r(json_encode($username));
   //    print_r($username);
   // }