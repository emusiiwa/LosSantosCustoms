<?php require_once 'staffsec.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylesheet.css">
    <link rel="stylesheet" href="forms.css">
    <link rel="stylesheet" href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css'>
    <link rel="icon" type="image/x-icon" href="Images/Car Sale Website Images/fav-icon.png">
    <title>Los Santos Customs</title>
</head>

<body>

    <header style="background-color: #fff;">

        <nav>

            <a href="JS_index.html" class="logo">Los <span>Santos</span> Customs</a>

            <ul class="navbar">
                <li><a href="dashboard.php">Dashboard</a></li>
                <li><a href="employees.php" class="current">Users</a></li>
                <li><a href="garage.php">Garage</a></li>
            </ul>

            <a href="stafflogout.php" class="button1">Log-Out</a>


        </nav>

    </header>

    <br><br><br><br><br><br><br>

    <?php
    require_once('config.php');

    $empID = $_REQUEST['id'];

    $conn = mysqli_connect(SERVERNAME, USERNAME, PASSWORD, DATABASE) or die("<strong style=\"color: red;\">Sorry, something went wrong while connecting to the database!</strong>");

    $query = "SELECT FirstName, LastName, Email, Phone, Role FROM employees WHERE EmployeesID = $empID";

    $result = mysqli_query($conn, $query) or die("ERROR: unable to execute query!");

    while ($row = mysqli_fetch_array($result)) {
        $firstname = $row['FirstName'];
        $lastname = $row['LastName'];
        $mail = $row['Email'];
        $phone = $row['Phone'];
        $role = $row['Role'];
    }

    mysqli_close($conn);
    ?>

    <div class="main-block">
        <form action="updateemp.php" method="POST" enctype="multipart/form-data">
            <h1>Update Employee Details</h1>
            <fieldset>
                <legend>
                    <h3>Personal Details</h3>
                </legend>
                <div class="account-details">
                    <div>
                        <label for="fname">First Name</label>
                        <input type="text" name="fname" id="fname" value="<?php echo $firstname ?>" disabled>
                    </div>
                    <div>
                        <label for="lname">Last Name</label>
                        <input type="text" name="lname" id="lname" value="<?php echo $lastname ?>" disabled>
                    </div>
                    <div>
                        <label for="mail">Email</label>
                        <input type="email" name="mail" id="mail" placeholder="example@you.com"
                            value="<?php echo $mail ?>">
                    </div>
                    <div>
                        <label for="phone">Contact Number</label>
                        <input type="text" name="phone" id="phone" value="<?php echo $phone ?>">
                    </div>
                </div>
                <br><br>
            </fieldset>

            <fieldset>
                <legend>
                    <h3>Office Details</h3>
                </legend>
                <div class="account-details">
                    <div>
                        <label for="role">Role</label>
                        <select id="role" name="role">
                            <option value=""> <?php echo $role ?></option>
                            <option value=" salesman">Salesman</option>
                            <option value="detailer">Car Detailer</option>
                            <option value="hr">HR Consultant</option>
                            <option value="csr"> Customer Service Representative</option>
                        </select>
                    </div>
                    <div>
                        <label for="dealership">DealerShip</label>
                        <select id="dealership" name="dealership" disabled>
                            <option value="jhb">JHB</option>
                            <option value="cpt">CPT</option>
                            <option value="pta">PTA</option>
                            <option value="dbn">DBN</option>
                            <option value="plz">PLZ</option>
                            <option value="el">EL</option>
                            <option value="plk">PLK</option>
                        </select>
                    </div>
                    <br><br>
            </fieldset>

            <fieldset>
                <legend>
                    <h3>Terms and Conditions</h3>
                </legend>
                <div class="terms-mailing">
                    <div class="checkbox">
                        <input type="checkbox" name="checkbox"><span>The above details are
                            used
                            according to the <a href="#">Privacy Policy for LSC.</a></span>
                    </div><br><br>
            </fieldset>

            <br><br><br><br>
            <button type="submit" hidden href="#">Add Car</button>
            <input type="submit" name="update" value="Update Details" class="button1" style="width:100%">
        </form>
    </div>

    <?php

    /* if (isset($_REQUEST['update'])) {
        require_once("config.php");

        $mailup = $_REQUEST['mail'];
        $phoneup = $_REQUEST['phone'];
        $roleup = $_REQUEST['role'];

        echo $mailup;

        $conn = mysqli_connect(SERVERNAME, USERNAME, PASSWORD, DATABASE) or die("<strong style=\"color: red;\">Sorry, something went wrong while connecting to the database!</strong>");

        $query2 = "UPDATE employees SET Email = '$mailup', Phone = '$phoneup', Role = '$roleup' WHERE EmployeesID = $empID";
        $result2 = mysqli_query($conn, $query2) or die("ERROR: unable to update details!");

        mysqli_close($conn);

        header("Location: employees.php"); 
    }*/

    ?>


    <br><br><br><br><br>
    <footer>
        <div class="footer-container container">
            <div class="footer-box">
                <a href="JS_index.html" class="logo">Los <span>Santos</span> Customs</a>
                <div class="social-media">
                    <a href="https://www.facebook.com/"><i class='bx bxl-facebook'></i></a>
                    <a href="https://twitter.com/?lang=en"><i class='bx bxl-twitter'></i></a>
                    <a href="#"><i class='bx bxl-google'></i></a>
                    <a href="https://www.instagram.com/"><i class='bx bxl-instagram'></i></a>
                    <a href="#"><i class='bx bxl-youtube'></i></a>
                </div>
            </div>

            <div class="footer-box">
                <h3>Page</h3>
                <a href="JS_index.html">Home</a>
                <a href="cars.php">Cars</a>
                <a href="team.html">About</a>
                <a href="#">Blog</a>
                <a href="#">Dealerships</a>
            </div>

            <div class="footer-box">
                <h3>Support</h3>
                <a href="#">Advisories</a>
                <a href="#">Help</a>
                <a href="#">Find Dealership</a>
            </div>

            <div class="footer-box">
                <h3>Contact Us</h3>
                <p>Casey Chuma: 0680993179</p>
                <p>Roland Chuma:0615850984</p>
                <p>Emmanuel Musiiwa: 0789942877</p>
            </div>

        </div>
    </footer>


    <section class="copyright">
        <p>You can find us at: 3147 Prince Alfred St, Grahamstown, Makhanda, 6139 <br>
            © 2023 WebTech Project. All Rights Reserved. Proudly created by Group Kali
        </p>
    </section>

    <script src="main.js"></script>

</body>

</html>