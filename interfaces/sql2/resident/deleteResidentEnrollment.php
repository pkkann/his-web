<?php
	// Error code 0 = Everything went well!
	// Error code 1 = Could not delete resident... aborting!

	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$id_enrollment = $request->id_enrollment;

	$sql = "DELETE FROM resident_enrollment WHERE id_enrollment=" . $id_enrollment;

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