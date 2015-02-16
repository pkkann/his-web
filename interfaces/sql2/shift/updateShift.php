<?php
	// Error code 0 = Everything went well!
	// Error code 1 = Could not update shift... aborting!
	// Error code 2 = Shift was updated, but could not insert one of the users!

	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$id_shift = $request->id_shift;
	$leader = $request->leader->id_user;
	$users = $request->users;

	$sql_shift = "UPDATE shift SET leader_user_id=" . $leader . " WHERE id_shift=".$id_shift;

	$json_response = array();
	if($conn->query($sql_shift) === true) {
		//Shift updated :D!

		//Find what should be removed and what should be added
		$sql_users = "SELECT * FROM shift_user WHERE shift_id=" . $id_shift;
		$result_usersDB = mysqli_query($conn, $sql_users);
		$users_db = array();

		while ($row = mysqli_fetch_assoc($result_usersDB)) {
			array_push($users_db, $row);
		}

		$removeList = array();
		$addList = array();
		
		//Check what users should be removed from db
		foreach ($users_db as $user_db) {
			$in = false;
			foreach ($users as $user) {
				if($user_db['user_id'] == $user->id_user) {
					$in = true;
				}
			}
			if($in == false) {
				array_push($removeList, $user_db['id']);
			}
		}

		//Check what users should be added to db
		foreach ($users as $user) {
			$in = false;
			foreach ($users_db as $user_db) {
				if($user_db['user_id'] == $user->id_user) {
					$in = true;
				}
			}
			if($in == false) {
				array_push($addList, $user->id_user);
			}
		}

		$stmt_remove = $conn->prepare("DELETE FROM shift_user WHERE id = ?");
		$stmt_remove->bind_param("i", $id);

		foreach ($removeList as $item) {
			$id = $item;
			$stmt_remove->execute();
		}
		$stmt_remove->close();

		$stmt_add = $conn->prepare("INSERT INTO shift_user SET shift_id=".$id_shift.", user_id=?");
		$stmt_add->bind_param("i", $id2);

		foreach ($addList as $item) {
			$id2 = $item;
			$stmt_add->execute();
		}

		$stmt_add->close();

		array_push($json_response, 0);
	} else {
		//Shift could not be inserted!
		array_push($json_response, 1);
		array_push($json_response, $conn->error);
	}

	echo json_encode($json_response);

	$conn->close();
?>