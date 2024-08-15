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
  if (empty($_POST["username"])) {
    $usernameErr = "UserName is required";
    $missinginfo = 1;
  } else {
    $username = mysqli_real_escape_string($conn, test_input($_POST["username"]));
  }

  if (empty($_POST["password"])) {
    $passwordErr = "Password is required";
    $missinginfo = 1;
  } else {
    $password = mysqli_real_escape_string($conn,test_input($_POST["password"]));
  }

}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

if (isset($_REQUEST['submit']) && $missinginfo == 0) {  
      

  

  $query = "select * from customers where Username = '$username' AND Password = SHA1('$password')";

  $result = mysqli_query($conn, $query) or die("ERROR: Cannot validate credentials");

  if(mysqli_num_rows($result) == 1){
    $_SESSION['access'] = "yes"; //set session variable to allow access to website
    header("Location: cars.php?custid=$username"); //go to the car tab
  }
  
  //reads the log file
  $query = "select * from customers where Username = '$username'";

  $result = mysqli_query($conn, $query) or die("ERROR: Cannot validate credentials");
 //detects incorrect login attempts
  if(mysqli_num_rows($result) > 0){
    $row = mysqli_fetch_object($result);
    if(password_verify(($_POST["password"]), $row->Password)){
 
    }else{
      $_SESSION["error"] = "Incorrect password";
    }
  }else{
    $_SESSION["error"] = "Incorrect username";
  }
   

  //closing the connection to the database
  mysqli_close($conn);

}
?>