<?php
	// Error code 0 = Everything went well!
	// Error code 1 = Could not update user... aborting!

	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$id_user = $request->id_user;
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

	$sql_shift = "UPDATE user SET name='".$name."', email='".$email."', phone='".$phone."', username='".$name."', username='".$username."', password='".$password."', administrator=".$administrator." WHERE id_user=". $id_user;

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