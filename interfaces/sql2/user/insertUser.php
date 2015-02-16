<?php
	// Error code 0 = Everything went well!
	// Error code 1 = Could not insert user... aborting!

	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$name = $request->name;
	$email = $request->email;
	$phone = $request->phone;
	$username = $request->username;
	$password = $request->password;
	$administrator = $request->administrator;
	if($administrator == true) {
		$administrator = 1;
	} else {
		$administrator = 0;
	}
	$createdate = $request->createdate;


	$sql_shift = "INSERT INTO user (name, email, phone, username, password, administrator, createdate) VALUES('".$name."', '".$email."', '".$phone."', '".$username."', '".$password."', ".$administrator.", '".$createdate."')";

	$json_response = array();
	if($conn->query($sql_shift) === true) {
		array_push($json_response, 0);
	} else {
		array_push($json_response, 1);
		array_push($json_response, $conn->error);
	}

	echo json_encode($json_response);

	$conn->close();
?>