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
            <a href="dashboard.php" class="logo">Los <span>Santos</span> Customs</a>

            <ul class="navbar">
                <li><a href="dashboard.php">Dashboard</a></li>
                <li><a href="employees.php">Users</a></li>
                <li><a href="garage.php">Garage</a></li>
            </ul>

            <a href="stafflogout.php" class="button1">Log-Out</a>
        </nav>
    </header>
    <br><br><br><br><br><br><br><br>

    <?php


    if (isset($_REQUEST['submit'])) {

        // get values from form
        $fname = $_REQUEST['fname'];
        $lname = $_REQUEST['lname'];
        $mail = $_REQUEST['mail'];
        $phone = $_REQUEST['phone'];
        $role = $_REQUEST['role'];
        $dealership = $_REQUEST['dealership'];
        $pwd = $_REQUEST['passwd'];

        $pwdenc = sha1($pwd);

        //fetching database credentials to make a connection
        require_once("config.php");

        //conecting to the database
        $conn = mysqli_connect(SERVERNAME, USERNAME, PASSWORD, DATABASE) or die("<strong style=\"color: red;\">Sorry, something went wrong while connecting to the database!</strong>");

        $query = "INSERT INTO employees(FirstName, LastName, Email, Phone, Role, EmpPassword)
                VALUES('$lname', '$fname', '$mail', '$phone', '$role', '$pwdenc')";

        $result = mysqli_query($conn, $query) or die("ERROR: unable to execute query!");

        //closing the connection to the database
        mysqli_close($conn);

        // display message to confirm the data was inserted
        echo "<p style=\"color: blue;\">The new employee <strong>$fname $lname</strong> was successfully added!</p>";
    }

    ?>

    <div class="main-block">
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST" enctype="multipart/form-data">
            <h1>Add Employee</h1>
            <fieldset>
                <legend>
                    <h3>Personal Details</h3>
                </legend>
                <div class="account-details">
                    <div>
                        <label for="fname">First Name</label>
                        <input type="text" name="fname" id="fname" required>
                    </div>
                    <div>
                        <label for="lname">Last Name</label>
                        <input type="text" name="lname" id="lname" required>
                    </div>
                    <div>
                        <label for="mail">Email</label>
                        <input type="email" name="mail" id="mail" placeholder="example@you.com" required>
                    </div>
                    <div>
                        <label for="phone">Contact Number</label>
                        <input type="text" name="phone" id="phone" required>
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
                            <option value="Salesman">Salesman</option>
                            <option value="Car Detailer">Car Detailer</option>
                            <option value="HR Consultant">HR Consultant</option>
                            <option value="Customer Service Representative"> Customer Service Representative</option>
                        </select>
                    </div>
                    <div>
                        <label for="dealership">DealerShip</label>
                        <select id="dealership" name="dealership">
                            <option value="jhb">JHB</option>
                            <option value="cpt">CPT</option>
                            <option value="pta">PTA</option>
                            <option value="dbn">DBN</option>
                            <option value="plz">PLZ</option>
                            <option value="el">EL</option>
                            <option value="plk">PLK</option>
                        </select>
                    </div>
                    <div>
                        <label for="passwd">Password</label>
                        <input type="password" name="passwd" id="passwd" required>
                    </div>
                    <br><br>
            </fieldset>

            <fieldset>
                <legend>
                    <h3>Terms and Conditions</h3>
                </legend>
                <div class="terms-mailing">
                    <div class="checkbox">
                        <input type="checkbox" name="checkbox"><span>I accept that the above details will be used
                            according to the <a href="#">Privacy Policy for LSC.</a></span>
                    </div><br><br>
            </fieldset>

            <br><br><br><br>
            <button type="submit" hidden href="#">Add Car</button>
            <input type="submit" name="submit" value="Add Employee" class="button1" style="width:100%">
        </form>
    </div>

    <br><br><br><br>
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