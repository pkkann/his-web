<?php
	// Error code 0 = Everything went well!
	// Error code 1 = Could not delete user... aborting!

	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$id_user = $request->id_user;

	$sql_shift = "DELETE FROM user WHERE id_user=" . $id_user;

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