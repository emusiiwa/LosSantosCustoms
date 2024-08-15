<?php

$carID = $_REQUEST['id'];
require_once('config.php');

  $conn = mysqli_connect(SERVERNAME, USERNAME, PASSWORD, DATABASE) or die("<strong style=\"color: red;\">Sorry, something went wrong while connecting to the database!</strong>");

    $query = "DELETE FROM cars WHERE carID = $carID";

    $result = mysqli_query($conn, $query) or die("ERROR: unable to execute query!");

    mysqli_close($conn);

    header("Location:garage.php");

?>