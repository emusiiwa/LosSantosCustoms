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
                <li><a href="employees.php">Users</a></li>
                <li><a href="garage.php" class="current">Garage</a></li>
            </ul>

            <a href="stafflogout.php" class="button1">Log-Out</a>

        </nav>

    </header>

    <br><br><br><br><br><br><br>

    <?php
    require_once('config.php');

    $carID = $_REQUEST['id'];
    $conn = mysqli_connect(SERVERNAME, USERNAME, PASSWORD, DATABASE) or die("<strong style=\"color: red;\">Sorry, something went wrong while connecting to the database!</strong>");

    $query = "SELECT Make, Model, Manufacture_YearDate, Price, Type, Engine_Number, Description, Image, Transmission, Colour FROM cars WHERE carID= $carID";

    $result = mysqli_query($conn, $query) or die("ERROR: unable to execute query!");

    while ($row = mysqli_fetch_array($result)) {
        $make = $row['Make'];
        $model = $row['Model'];
        $year = $row['Manufacture_YearDate'];
        $price = $row['Price'];
        $type = $row['Type'];
        $engine = $row['Engine_Number'];
        $description = $row['Description'];
        $picture = $row['Image'];
        $transmission = $row['Transmission'];
        $colour = $row['Colour'];
    }

    mysqli_close($conn);
    ?>

    <div class="main-block">
        <form action="garage.php" method="POST" enctype="multipart/form-data">
            <h1>More Car Details</h1>
            <fieldset>
                <legend>
                    <h3>Car Details</h3>
                </legend>
                <div class="account-details">
                    <div>
                        <label for="make">Make</label>
                        <input type="text" name="make" id="make" value="<?php echo $make ?>" disabled>
                    </div>
                    <div>
                        <label for="model">Model</label>
                        <input type="text" name="model" id="model" value="<?php echo $model ?>" disabled>
                    </div>
                    <div>
                        <label for="year">Manufacture Year and Date</label>
                        <input type="date" name="year" id="year" value="<?php echo $year ?>" disabled>
                    </div>
                    <div>
                        <label for="pprice">Purchase Price (USD)</label>
                        <input type="number" name="pprice" id="pprice" value="<?php echo $price ?>" disabled>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>
                    <h3>Car Specifications</h3>
                </legend>
                <div class="account-details">
                    <div>
                        <label for="picture">Picture</label>
                        <input type="file" id="picture" name="picture" value="<?php echo $picture ?>" disabled>
                    </div>
                    <div>
                        <label for="type">Type</label>
                        <select id="type" name="type" value="<?php echo $type ?>" disabled>
                            <option value="coupe">Coupe</option>
                            <option value="fastback">Fastback</option>
                            <option value="hatchback">Hatchback</option>
                            <option value="sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="van">Van</option>
                        </select>
                    </div>
                    <div>
                        <label for="engine">Engine Number</label>
                        <input type="text" name="engine" id="engine" value="<?php echo $engine ?>" disabled>
                    </div>
                    <div>
                        <label for="transmission">Transmission</label>
                        <select id="transmission" name="transmission" value="<?php echo $transmission ?>" disabled>
                            <option value="automatic">AUTOMATIC</option>
                            <option value="manual">MANUAL</option>
                        </select>
                    </div>
                    <div>
                        <label for="colour">Color</label>
                        <input type="text" name="colour" id="colour" value="<?php echo $colour ?>" disabled>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>
                    <h3>Terms and Conditions</h3>
                </legend>
                <div class="terms-mailing">
                    <div class="checkbox">
                        <input type="checkbox" name="checkbox" disabled><span>I accept the <a href="#">Privacy Policy
                                for
                                LSC.</a></span>
                    </div>
            </fieldset>

            <button type="submit" hidden href="#">Add Car</button>
            <input type="submit" name="submit" value="GO BACK TO GARAGE" class="button1" style="width:100%">
        </form>
    </div>


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