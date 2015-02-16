<?php
	// Error code 0 = Everything went well!
	// Error code 1 = Could not delete resident... aborting!

	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$shift_id = $request->shift_id;
	$guest_id= $request->guest_id;
	$resident_id = $request->resident_id;
	$createdate = $request->createdate;

	$sql = "INSERT INTO guest_enrollment (shift_id, guest_id, resident_id, createdate) VALUES(".$shift_id.", ".$guest_id.", ".$resident_id.", '".$createdate."')";

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