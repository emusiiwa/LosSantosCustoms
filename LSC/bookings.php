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


    <style>
    table {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
        border: none;
    }

    table td,
    table th {
        border: none;
        padding: 8px;
    }

    table tr:nth-child(0) {
        background-color: rgba(50, 115, 220, 0.3);
    }

    table tr:hover {
        background-color: #d90429;
    }

    table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #d90429;
        color: white;
    }

    img {
        width: 125px;
        height: 125px;
    }
    </style>
</head>

<body>
    <header style="background-color: #fff;">

        <nav>
            <a href="dashboard.php" class="logo">Los <span>Santos</span> Customs</a>

            <ul class="navbar">
                <li><a href="dashboard.php">Dashboard</a></li>
                <li><a href="employees.php">Users</a></li>
                <li><a href="garage.php" class="current">Garage</a></li>
                <li><a href="bookings.php">Bookings</a></li>
            </ul>

            <a href="stafflogout.php" class="button1">Log-Out</a>
        </nav>

    </header>

    <br><br><br><br>


    <section class="cars-table">
        <br><br>

        <h1><strong>Test Drive Bookings</strong></h1>

        <?php


        //fetching database credentials to make a connection
        require_once("config.php");

        //conecting to the database
        $conn = mysqli_connect(SERVERNAME, USERNAME, PASSWORD, DATABASE) or die("<strong style=\"color: red;\">Sorry, something went wrong while connecting to the database!</strong>");

        $query = "SELECT * FROM bookings ORDER BY Date desc";

        $result = mysqli_query($conn, $query) or die("ERROR: unable to execute query!");


        echo "<table width=\"80%\" border=0>
        <tr style = \"background-color: #d90429; text-align: center;\">
                <td><strong>Booking Number</strong></td>
                <td><strong>Customer Name</strong></td>
                <td><strong>Car Make</strong></td>
                <td><strong>Test Date</strong></td>
            </tr>";

        while ($row = mysqli_fetch_array($result)) {
            echo  "<tr style = \"text-align: center;\">";
            echo   "<td>" . $row['BookingID'] . "</td>";
            echo   "<td>" . $row['Customer'] . "</td>";
            echo   "<td>" . $row['Car'] . "</td>";
            echo   "<td>" . $row['Date'] . "</td>";
            echo "</tr>";
        }

        echo "</table>";

        //closing the connection to the database
        mysqli_close($conn);

        ?>


        <br><br><br>
    </section>

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