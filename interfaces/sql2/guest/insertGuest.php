<?php
	// Error code 0 = Everything went well!
	// Error code 1 = Could not insert... aborting!

	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$name = $request->name;
	$address = $request->address;
	$birthday = $request->birthday;
	$createdate = $request->createdate;


	$sql = "INSERT INTO guest (name, address, birthday, createdate) VALUES('".$name."', '".$address."', '".$birthday."', '".$createdate."')";

	$json_response = array();
	if($conn->query($sql) === true) {
		array_push($json_response, 0);
	} else {
		array_push($json_response, 1);
		array_push($json_response, $conn->error);
	}

	echo json_encode($json_response);

	$conn->close();
?>