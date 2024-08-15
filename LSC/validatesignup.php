<?php
// define variables and set to empty values
$nameErr = $usernameErr = $emailErr =  $passwordErr =  ""; //phone number not required so throws no error
$name = $username = $email = $number = $password = $password2  = "";
$missinginfo = 0;


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (empty($_POST["name"])) {
        $nameErr = "Name is required";
        $missinginfo = 1;
      } else {
        $name = test_input($_POST["name"]);
        if (!preg_match("/^[a-zA-Z-' ]*$/",$name)) {
          $nameErr = "Only letters and white space allowed";

        }
      }
    
  if (empty($_POST["username"])) {
    $usernameErr = "UserName is required";
    $missinginfo = 1;
  } else {
    $username = test_input($_POST["username"]);
  }

  if (empty($_POST["email"])) {
    $emailErr = "Email is required";
    $missinginfo = 1;
  } else {
    $email = test_input($_POST["email"]);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $emailErr = "Invalid email format";
    }
  }

  if (! empty($_POST["number"])) {
    $number = test_input($_POST["number"]);
  }

  if (empty($_POST["password"])) {
    $passwordErr = "Password is required";
    $missinginfo = 1;
  } else {
    $password = test_input($_POST["password"]);
  }

  if (empty($_POST["password2"])) {
    $passwordErr = "Password is required";
    $missinginfo = 1;
  } else {
    $password2 = test_input($_POST["password2"]);
    if ($password != $password2){
      $passwordErr = "Passwords are not the same";
      $missinginfo = 1;
    }

  }

}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

if (isset($_REQUEST['submit']) && $missinginfo == 0) {  
      

  //fetching database credentials to make a connection
  require_once("config.php");

  //conecting to the database
  $conn = mysqli_connect(SERVERNAME, USERNAME, PASSWORD, DATABASE) or die("<strong style=\"color: red;\">Sorry, something went wrong while connecting to the database!</strong>");

  $query = "INSERT INTO customers(Username, Name, Password, Email, Phone)
          VALUES('$username', '$name', SHA1('$password'), '$email', '$number');";

  $result = mysqli_query($conn, $query) or die("ERROR: Signup failed");

  //closing the connection to the database
  mysqli_close($conn);

  // display message to confirm the data was inserted
  echo "<p style=\"color: blue;\">Successful!</p>";
  header("Location: login.php");
}
?>