<?php

$empID = $_REQUEST['id'];
require_once('config.php');

  $conn = mysqli_connect(SERVERNAME, USERNAME, PASSWORD, DATABASE) or die("<strong style=\"color: red;\">Sorry, something went wrong while connecting to the database!</strong>");

    $query = "DELETE FROM employees WHERE EmployeesID = $empID";

    $result = mysqli_query($conn, $query) or die("ERROR: unable to execute query!");

    mysqli_close($conn);

    header("Location:employees.php");

?>