<?php
	// Error code 0 = Everything went well!
	// Error code 1 = Could not insert resident... aborting!

	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$name = $request->name;
	$address = $request->address;
	$birthday = $request->birthday;
	$phone = $request->phone;
	$email = $request->email;
	$hoene = $request->hoene;
	if($hoene == true) {
		$hoene = 1;
	} else {
		$hoene = 0;
	}
	$reserve = $request->reserve;
	if($reserve == true) {
		$reserve = 1;
	} else {
		$reserve = 0;
	}
	$oneone = $request->oneone;
	if($oneone == true) {
		$oneone = 1;
	} else {
		$oneone = 0;
	}
	$fromoutside = $request->fromoutside;
	if($fromoutside == true) {
		$fromoutside = 1;
	} else {
		$fromoutside = 0;
	}
	$barcode = $request->barcode;
	$createdate = $request->createdate;

	$sql_shift = "INSERT INTO resident (name, address, birthday, phone, email, hoene, reserve, oneone, fromoutside, barcode, createdate) VALUES('".$name."', '".$address."', '".$birthday."', '".$phone."', '".$email."', ".$hoene.", ".$reserve.", ".$oneone.", ".$fromoutside.", '".$barcode."', '".$createdate."')";

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