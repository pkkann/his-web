<?php
	// Error code 0 = Everything went well!
	// Error code 1 = Could not delete resident... aborting!

	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$id_shift = $request->id_shift;
	$id_resident = $request->id_resident;
	$createdate = $request->createdate;

	$sql = "INSERT INTO resident_enrollment SET resident_id=".$id_resident.", shift_id=".$id_shift.", createdate='".$createdate."'";

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