<?php
	// Error code 0 = Everything went well!
	// Error code 1 = Could not update... aborting!

	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$id_guest = $request->id_guest;
	$name = $request->name;
	$address = $request->address;
	$birthday = $request->birthday;

	$sql = "UPDATE guest SET name='".$name."', address='".$address."', birthday='".$birthday."' WHERE id_guest=" . $id_guest;

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