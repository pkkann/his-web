<?php
	require_once('connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$table = $request->table;
	$columns = $request->columns;
	$values = $request->values;
	$whereColumns = $request->whereColumns;
	$whereData = $request->whereData;

	$sql = "UPDATE " . $table . " SET ";

	$c = count($columns);

	for($i = 0; $i < $c; $i++) {
		$sql .= $columns[$i] . "=" . $values[$i];

		if($i != ($c - 1)) {
			$sql .= ", ";
		}
	}

	$sql .=" WHERE " . $whereColumns[0] . "=" . $whereData[0];

	$c1 = count($whereColumns);

	if($c1 > 1) {
		for($i = 1; $i < $c1; $i++) {
			$sql .= " AND " . $whereColumns[$i] . "=" . $whereData[$i];
		}
	}
	
	if($conn->query($sql) === true) {
		echo true;
	} else {
		echo false;
		echo $conn->error;
	}

	fclose($conn);
?>