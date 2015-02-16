<?php
	// Error code 0 = Everything went well!
	// Error code 1 = Could not insert shift... aborting!
	// Error code 2 = Shift was inserted, but could not insert one of the users!

	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$createdate = $request->createdate;
	$closedate = $request->closedate;
	$leader = $request->leader->id_user;
	$users = $request->users;

	$sql_shift = "INSERT INTO shift (createdate, closedate, leader_user_id) VALUES('".$createdate."', '".$closedate."', ".$leader.")";

	$json_response = array();
	if($conn->query($sql_shift) === true) {
		//Shift inserted :D!
		
		$shift_id = mysqli_insert_id($conn);

		$stmt = $conn->prepare("INSERT INTO shift_user (shift_id, user_id) VALUES(?, ?)");
		$stmt->bind_param("ii", $shift_id, $user_id);

		$failed = false;

		foreach ($users as $user) {
			$user_id = $user->id_user;
			if (!$stmt->execute()) { 
			   array_push($json_response, 2);
			   array_push($json_response, $conn->error);
			   $failed = true;
			   break;
			}
		}
		
		if(!$failed) {
			array_push($json_response, 0);
		}
	
	} else {
		//Shift could not be inserted!
		array_push($json_response, 1);
		array_push($json_response, $conn->error);
	}

	echo json_encode($json_response);

	$stmt->close();
	$conn->close();
?>