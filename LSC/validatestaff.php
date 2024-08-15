<?php
session_start();
// define variables and set to empty values
$usernameErr = $passwordErr =  "";
$username = $password  = "";
$missinginfo = 0;

//fetching database credentials to make a connection
require_once("config.php");

//conecting to the database
$conn = mysqli_connect(SERVERNAME, USERNAME, PASSWORD, DATABASE) or die("<strong style=\"color: red;\">Sorry, something went wrong while connecting to the database!</strong>");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST['username'])) {
        $usernameErr = "UserName is required";
        $missinginfo = 1;
    } else {
        $username = mysqli_real_escape_string($conn, test_input($_POST["username"]));
    }

    if (empty($_POST['password'])) {
        $passwordErr = "Password is required";
        $missinginfo = 1;
    } else {
        $password = mysqli_real_escape_string($conn, sha1(test_input($_POST["password"])));
    }
}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if (isset($_REQUEST['submit']) && $missinginfo == 0) {


    

    
    $query = "SELECT * FROM employees WHERE Email = '$username' AND EmpPassword = '$password'";
    $result = mysqli_query($conn, $query) or die("ERROR: unable to validate your credentials");

    if (mysqli_num_rows($result) == 1) {
        $_SESSION['access'] = "yes"; //set session variable to allow access to website
        header("Location: dashboard.php"); //go to the cdashboard tab
    } else {
        header("Location: stafflog.php");
    }



    //closing the connection to the database
    mysqli_close($conn);
}