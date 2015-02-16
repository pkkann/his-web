<?php
	//Create Database connection
    // Create connection
	$host = "194.255.32.68";
	$user = "his";
	$pass = "LdDWNWaQPSqy6u3s";
	$db = "his";

	$conn = new mysqli($host, $user, $pass, $db);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	mysqli_set_charset($conn, 'utf8');
?>