<?php
defined('BASEPATH') OR exit('direct access not allowed');

// defines database info	
$dsn = 'mysql:host=localhost:3306;dbname=bugtracker;charset=utf8';
$user = 'root';
$password = 'root';

try {
   // create the PDO client
   $db = new PDO($dsn, $user, $password);
   $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} 
catch(PDOException $e) {
   die("Connection error!");
   // echo 'connection failed: '.$e->getMessage();
}
