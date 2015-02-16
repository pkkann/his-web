<?php

	require_once('connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$table = $request->table;
	$columns = $request->columns;
	$whereColumns = $request->whereColumns;
	$whereData = $request->whereData;

	$sql = "SELECT " . implode(",", $columns) . " FROM " . $table . " WHERE " . $whereColumns[0] . "=" . $whereData[0];

	$c = count($whereColumns);


	if($c > 1) {
		for($i = 1; $i < $c; $i++) {
			$sql .= " AND " . $whereColumns[$i] . "=" . $whereData[$i];
		}
	}

	$json_response = array();

	$columnsResult = mysqli_query($conn, $sql) or die("Failed to do select");

	while ($row = mysqli_fetch_assoc($columnsResult)) {
		foreach ($columns as $column) {
			$row_array[$column] = $row[$column];
		}

		array_push($json_response,$row_array);
	}

	echo json_encode($json_response);

	fclose($conn);
	
?>