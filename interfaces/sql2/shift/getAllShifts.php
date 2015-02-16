<?php
	require_once('../connection.php');

	$sql = "SELECT shift.id_shift AS shift_id_shift, DATE_FORMAT(shift.createdate,'%d/%m/%Y %H:%i') AS shift_createdate, DATE_FORMAT(shift.closedate,'%d/%m/%Y %H:%i') AS shift_closedate, shift.leader_user_id, user.id_user AS leader_id_user, user.name AS leader_name, user.email AS leader_email, user.phone AS leader_phone, user.username AS leader_username, user.password AS leader_password, user.administrator AS leader_administrator, DATE_FORMAT(user.createdate,'%d/%m/%Y %H:%i') AS leader_createdate FROM shift INNER JOIN user ON shift.leader_user_id=user.id_user";

	$result = mysqli_query($conn, $sql) or die ($conn->Error);
	$json_response = array();

	while ($row = mysqli_fetch_assoc($result)) {
		$row_array['id_shift'] = $row['shift_id_shift'];
		$row_array['createdate'] = $row['shift_createdate'];
		$row_array['closedate'] = $row['shift_closedate'];
		$row_array['leader']['id_user'] = $row['leader_id_user'];
		$row_array['leader']['name'] = $row['leader_name'];
		$row_array['leader']['email'] = $row['leader_email'];
		$row_array['leader']['phone'] = $row['leader_phone'];
		$row_array['leader']['username'] = $row['leader_username'];
		$row_array['leader']['password'] = $row['leader_password'];
		$row_array['leader']['administrator'] = $row['leader_administrator'];
		$row_array['leader']['createdate'] = $row['leader_createdate'];

		$sql2 = "SELECT * FROM shift_user JOIN user ON shift_user.user_id=user.id_user WHERE shift_id=" . $row['shift_id_shift'];
		$result2 = mysqli_query($conn, $sql2) or die ("Error");

		$users_array = array();

		while ($row2 = mysqli_fetch_assoc($result2)) {
			$user_array['id_user'] = $row2['user_id'];
			$user_array['name'] = $row2['name'];
			$user_array['email'] = $row2['email'];
			$user_array['phone'] = $row2['phone'];
			$user_array['username'] = $row2['username'];
			$user_array['password'] = $row2['password'];
			$user_array['administrator'] = $row2['administrator'];
			$user_array['createdate'] = $row2['createdate'];

			array_push($users_array, $user_array);
		}

		$row_array['users'] = $users_array;

		$sql3 = "SELECT * FROM resident_enrollment JOIN resident ON resident_enrollment.resident_id=resident.id_resident WHERE shift_id=" . $row['shift_id_shift'];
		$result3 = mysqli_query($conn, $sql3) or die ("Error");

		$enrollments_array = array();
		
		while ($row3 = mysqli_fetch_assoc($result3)) {
			$enrollment_array['id_resident'] = $row3['resident_id'];
			$enrollment_array['name'] = $row3['name'];

			array_push($enrollments_array, $enrollment_array);
		}

		$row_array['enrollments'] = $enrollments_array;
		
		array_push($json_response, $row_array);
	}

	echo json_encode($json_response);

	$conn->close();
?>