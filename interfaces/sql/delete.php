<?php
	require_once('connection.php');

	$postdata = file_get_contents('php://input');

	$request = json_decode($postdata);

	$table = $request->table;
	$id = $request->id;

	$sql = "DELETE FROM " . $table . " WHERE id = " . $id . ";";

	if($conn->query($sql) === true) {
		echo true;
	} else {
		echo false;
	}

	fclose($conn);
?>