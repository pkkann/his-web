<?php
	require_once('../connection.php');

	$sql = "SELECT id_user, name, email, phone, username, password, administrator, DATE_FORMAT(createdate,'%d/%m/%Y %H:%i') createdate FROM user";

	$result = mysqli_query($conn, $sql) or die ("Error");
	$json_response = array();

	while ($row = mysqli_fetch_assoc($result)) {
		$row_array['id_user'] = $row['id_user'];
		$row_array['name'] = $row['name'];
		$row_array['email'] = $row['email'];
		$row_array['phone'] = $row['phone'];
		$row_array['username'] = $row['username'];
		$row_array['password'] = $row['password'];
		if($row['administrator'] == 1) {
			$row_array['administrator'] = true;
		} else {
			$row_array['administrator'] = false;
		}
		
		$row_array['createdate'] = $row['createdate'];

		array_push($json_response, $row_array);
	}

	echo json_encode($json_response);

	$conn->close();
?>