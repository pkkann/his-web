<?php
	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$id_shift = $request->id_shift;

	$sql = "UPDATE shift SET closedate='' WHERE id_shift=" . $id_shift;

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