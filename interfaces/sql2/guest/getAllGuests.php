<?php
	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$sql = "SELECT id_guest, name, address, DATE_FORMAT(birthday,'%d/%m/%Y') birthday, DATE_FORMAT(createdate,'%d/%m/%Y %H:%i') createdate FROM guest;";

	$result = mysqli_query($conn, $sql) or die ("Error");
	$json_response = array();

	while ($row = mysqli_fetch_assoc($result)) {
		$row_array['id_guest'] = $row['id_guest'];
		$row_array['name'] = $row['name'];
		$row_array['address'] = $row['address'];
		$row_array['birthday'] = $row['birthday'];
		$row_array['createdate'] = $row['createdate'];

		
		$sql2 = "SELECT id_quarantine, comment, DATE_FORMAT(createdate,'%d/%m/%Y %H:%i') createdate FROM guest_quarantine WHERE guest_id=" . $row['id_guest'];
		$result2 = mysqli_query($conn, $sql2) or die ("Error");

		while ($row2 = mysqli_fetch_assoc($result2)) {
			$row_array['quarantine']['id_quarantine'] = $row2['id_quarantine'];
			$row_array['quarantine']['comment'] = $row2['comment'];
			$row_array['quarantine']['createdate'] = $row2['createdate'];
		}
		
		if(isset($request->id_shift)) {
			$sql3 = "SELECT id_enrollment, shift_id, resident_id , DATE_FORMAT(createdate,'%d/%m/%Y %H:%i') createdate FROM guest_enrollment WHERE guest_id=" . $row['id_guest'] . " AND shift_id=" . $request->id_shift;
			$result3 = mysqli_query($conn, $sql3) or die ("Error");
		
			while ($row3 = mysqli_fetch_assoc($result3)) {
				$row_array['enrollment']['id_enrollment'] = $row3['id_enrollment'];
				$row_array['enrollment']['createdate'] = $row3['createdate'];
			}
		}
		
		array_push($json_response, $row_array);
		unset($row_array['quarantine']);
		if(isset($request->id_shift)) {
			unset($row_array['enrollment']);
		}
	}

	echo json_encode($json_response);

	$conn->close();
?>