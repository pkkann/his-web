<?php
	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$username = $request->username;
	$password = $request->password;

	$sql = "SELECT * FROM user WHERE username='".$username."' AND password='".$password."'";

	$result = mysqli_query($conn, $sql) or die ("Error");
	$json_response = array();

	while ($row = mysqli_fetch_assoc($result)) {
		$row_array['id_user'] = $row['id_user'];
		$row_array['name'] = $row['name'];
		$row_array['email'] = $row['email'];
		$row_array['phone'] = $row['phone'];
		$row_array['username'] = $row['username'];
		$row_array['password'] = $row['password'];
		$row_array['administrator'] = $row['administrator'];
		$row_array['createdate'] = $row['createdate'];

		array_push($json_response, $row_array);
	}

	echo json_encode($json_response);

	$conn->close();
?>