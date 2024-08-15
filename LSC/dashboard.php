<?php require_once 'staffsec.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" rel="stylesheet">
    <link rel="stylesheet" href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css'>
    <link rel="stylesheet" href="dashboard.css">
    <title>Los Santos Customs</title>
</head>

<body>

    <div class="container">
        <!-- Sidebar Section -->
        <aside>
            <div class="toggle">
                <div class="logo">
                    <h2><a href="dashboard.php">Los<span class="danger">Santos</span>Customs</a></h2>
                </div>
                <div class="close" id="close-btn">
                    <span class="material-icons-sharp">
                        close
                    </span>
                </div>
            </div>

            <div class="sidebar">
                <a href="dashboard.php" class="active">
                    <span class="material-icons-sharp">
                        dashboard
                    </span>
                    <h3>Dashboard</h3>
                </a>
                <a href="employees.php">
                    <span class="material-icons-sharp">
                        person_outline
                    </span>
                    <h3>Users</h3>
                </a>
                <a href="addemployee.php">
                    <span class="material-icons-sharp">
                        <i class='bx bx-user-plus'></i>
                    </span>
                    <h3>Add Employee</h3>
                </a>
                <a href="addcar.php">
                    <span class="material-icons-sharp">
                        <i class='bx bx-car'></i>
                    </span>
                    <h3>Add Car</h3>
                </a>
                <a href="garage.php">
                    <span class="material-icons-sharp">
                        <i class='bx bxs-car-garage' undefined></i>
                    </span>
                    <h3>Inventory</h3>
                </a>
                <a href="bookings.php">
                    <span class="material-icons-sharp">
                        receipt_long
                    </span>
                    <h3>Bookings</h3>
                </a>
                <a href="#">
                    <span class="material-icons-sharp">
                        mail_outline
                    </span>
                    <h3>Teams</h3>
                    <span class="message-count">27</span>
                </a>
                <a href="#">
                    <span class="material-icons-sharp">
                        settings
                    </span>
                    <h3>Settings</h3>
                </a>

                <a href="stafflogout.php">
                    <span class="material-icons-sharp">
                        logout
                    </span>
                    <h3>Logout</h3>
                </a>
            </div>
        </aside>
        <!-- End of Sidebar Section -->

        <!-- Main Content -->
        <main>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Perfomance</h1>
            <!-- Analyses -->
            <div class="analyse">
                <div class="sales">
                    <div class="status">
                        <div class="info">
                            <h3>Total Sales</h3>
                            <h1>$65,089</h1>
                        </div>
                        <div class="progresss">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div class="percentage">
                                <p>+81%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="visits">
                    <div class="status">
                        <div class="info">
                            <h3>Cars</h3>
                            <h1>24,981</h1>
                        </div>
                        <div class="progresss">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div class="percentage">
                                <p>-48%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="searches">
                    <div class="status">
                        <div class="info">
                            <h3>Best Dealership</h3>
                            <h1>14,147</h1>
                        </div>
                        <div class="progresss">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div class="percentage">
                                <p>+21%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End of Analyses -->

            <!-- New Users Section -->
            <div class="new-users">
                <h2>Teams Activity</h2>
                <div class="user-list">
                    <div class="user">
                        <img src="Images/Employees/Manu.png">
                        <h2>Emmanuel</h2>
                        <p>Last Active: 54 Min Ago</p>
                    </div>
                    <div class="user">
                        <img src="Images/Employees/roland.jpg">
                        <h2>Roland</h2>
                        <p>Last Active: 3 Hours Ago</p>
                    </div>
                    <div class="user">
                        <img src="Images/Employees/Casey.jpg">
                        <h2>Casey</h2>
                        <p>Last Active: 2 Min Ago</p>
                    </div>
                    <div class="user">
                        <a href="employees.php"><img src="Images/Car Sale Website Images/plus.png"></a>
                        <h2>More</h2>
                        <p>New User</p>
                    </div>
                </div>
            </div>
            <!-- End of New Users Section -->

            <!-- Recent Orders Table -->
            <div class="recent-orders">
                <h2>Recents</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Car Make</th>
                            <th>Model</th>
                            <th>Buying Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php

                        //fetching database credentials to make a connection
                        require_once("config.php");

                        //conecting to the database
                        $conn = mysqli_connect(SERVERNAME, USERNAME, PASSWORD, DATABASE) or die("<strong style=\"color: red;\">Sorry, something went wrong while connecting to the database!</strong>");

                        $query = "SELECT Make, Model, Price FROM cars ORDER BY carID desc limit 3";

                        $result = mysqli_query($conn, $query) or die("ERROR: unable to execute query!");

                        while ($row = mysqli_fetch_array($result)) {
                            echo  "<tr>";
                            echo   "<td>" . $row['Make'] . "</td>";
                            echo   "<td>" . $row['Model'] . "</td>";
                            echo   "<td>" . "$" . $row['Price'] . "</td>";
                            echo "</tr>";
                        }

                        echo "</tbody>";

                        //closing the connection to the database
                        mysqli_close($conn);
                        ?>

                </table>
                <a href="garage.php">Show All Cars</a>
            </div>
            <!-- End of Recent Orders -->

        </main>
        <!-- End of Main Content -->

        <!-- Right Section -->
        <div class="right-section">
            <div class="nav">
                <button id="menu-btn">
                    <span class="material-icons-sharp">
                        menu
                    </span>
                </button>
                <div class="dark-mode">
                    <span class="material-icons-sharp active">
                        light_mode
                    </span>
                    <span class="material-icons-sharp">
                        dark_mode
                    </span>
                </div>

                <div class="profile">
                    <div class="info">
                        <p>Hey, <b>Emmanuel</b></p>
                        <small class="text-muted">Admin</small>
                    </div>
                    <div class="profile-photo">
                        <img src="Images/Car Sale Website Images/user-regular-24.png">
                    </div>
                </div>

            </div>
            <!-- End of Nav -->

            <div class="user-profile">
                <div class="logo">
                    <img src="Images/Car Sale Website Images/logo.jpg">
                    <h2>LSC</h2>
                    <p>WebTech Project 2023</p>
                </div>
            </div>

            <div class="reminders">
                <div class="header">
                    <h2>Reminders</h2>
                    <span class="material-icons-sharp">
                        notifications_none
                    </span>
                </div>

                <div class="notification">
                    <div class="icon">
                        <span class="material-icons-sharp">
                            volume_up
                        </span>
                    </div>
                    <div class="content">
                        <div class="info">
                            <h3>Workshop</h3>
                            <small class="text_muted">
                                08:00 AM - 12:00 PM
                            </small>
                        </div>
                        <span class="material-icons-sharp">
                            more_vert
                        </span>
                    </div>
                </div>

                <div class="notification deactive">
                    <div class="icon">
                        <span class="material-icons-sharp">
                            edit
                        </span>
                    </div>
                    <div class="content">
                        <div class="info">
                            <h3>Board Meeting</h3>
                            <small class="text_muted">
                                14:00 PM - 15:00 PM
                            </small>
                        </div>
                        <span class="material-icons-sharp">
                            more_vert
                        </span>
                    </div>
                </div>

                <div class="notification add-reminder">
                    <div>
                        <span class="material-icons-sharp">
                            add
                        </span>
                        <h3>Add Reminder</h3>
                    </div>
                </div>

            </div>

        </div>


    </div>

    <script src="index.js"></script>
</body>

</html>