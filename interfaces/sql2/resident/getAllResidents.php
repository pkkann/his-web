<?php
	require_once('../connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$sql = "SELECT id_resident, name, address, DATE_FORMAT(birthday,'%d/%m/%Y') birthday, DATE_FORMAT(createdate,'%d/%m/%Y %H:%i') createdate, phone, email, hoene, reserve, oneone, fromoutside, barcode FROM resident;";

	$result = mysqli_query($conn, $sql) or die ("Error");
	$json_response = array();

	while ($row = mysqli_fetch_assoc($result)) {
		$row_array['id_resident'] = $row['id_resident'];
		$row_array['name'] = $row['name'];
		$row_array['address'] = $row['address'];
		$row_array['birthday'] = $row['birthday'];
		$row_array['phone'] = $row['phone'];
		$row_array['email'] = $row['email'];
		if($row['hoene'] == 1) {
			$row_array['hoene'] = true;
		} else {
			$row_array['hoene'] = false;
		}
		if($row['reserve'] == 1) {
			$row_array['reserve'] = true;
		} else {
			$row_array['reserve'] = false;
		}
		if($row['oneone'] == 1) {
			$row_array['oneone'] = true;
		} else {
			$row_array['oneone'] = false;
		}
		if($row['fromoutside'] == 1) {
			$row_array['fromoutside'] = true;
		} else {
			$row_array['fromoutside'] = false;
		}
		$row_array['barcode'] = $row['barcode'];
		$row_array['createdate'] = $row['createdate'];

		$sql2 = "SELECT id_quarantine, comment, DATE_FORMAT(createdate,'%d/%m/%Y %H:%i') createdate FROM resident_quarantine WHERE resident_id=" . $row['id_resident'];
		$result2 = mysqli_query($conn, $sql2) or die ("Error");

		while ($row2 = mysqli_fetch_assoc($result2)) {
			$row_array['quarantine']['id_quarantine'] = $row2['id_quarantine'];
			$row_array['quarantine']['comment'] = $row2['comment'];
			$row_array['quarantine']['createdate'] = $row2['createdate'];
		}

		if(isset($request->id_shift)) {
			$sql3 = "SELECT id_enrollment, shift_id, resident_id , DATE_FORMAT(createdate,'%d/%m/%Y %H:%i') createdate FROM resident_enrollment WHERE resident_id=" . $row['id_resident'] . " AND shift_id=" . $request->id_shift;
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