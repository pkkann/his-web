<?php
	require_once('connection.php');

	$postdata = file_get_contents('php://input');

	$table = $postdata;

	$sql = "SELECT * FROM " . $table;

	$result = mysqli_query($conn, $sql) or die("ERROR");

	$columnsResult = mysqli_query($conn, "SELECT `COLUMN_NAME`
		FROM `INFORMATION_SCHEMA`.`COLUMNS` 
		WHERE `TABLE_SCHEMA`='".$db."'
		AND `TABLE_NAME`='".$table."'") or die("Could not select columns");

	$columns = array();
	$json_response = array();

	while ($row = mysqli_fetch_assoc($columnsResult)) {
		array_push($columns, $row['COLUMN_NAME']);
	}

	while ($row = mysqli_fetch_assoc($result)) {
		foreach ($columns as $key) {
			$row_array[$key] = $row[$key];
		}

		array_push($json_response, $row_array);
	}

	echo json_encode($json_response);

	fclose($conn);
?>