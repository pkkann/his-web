<?php
	// Error code 0 = Everything went well!
	// Error code 1 = Could not delete resident... aborting!

	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$id_guest = $request->id_guest;
	$comment = $request->comment;
	$createdate = $request->createdate;

	$sql = "INSERT INTO guest_quarantine SET guest_id=".$id_guest.", comment='".$comment."', createdate='".$createdate."'";

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