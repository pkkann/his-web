<?php
	require_once('connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$table = $request->table;
	$columns = $request->columns;
	$values = $request->values;

	$sql = "INSERT INTO " . $table . " (" . implode(",", $columns) . ") VALUES(" . implode(",", $values) . ")";

	$json_response = array();
	if($conn->query($sql) === true) {
		array_push($json_response, true);
		array_push($json_response, mysqli_insert_id($conn));
		echo json_encode($json_response);
	} else {
		array_push($json_response, false);
		array_push($json_response, $conn->error);
		echo json_encode($json_response);
	}

	fclose($conn);
?>