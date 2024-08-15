<?php
session_start();

// Define the session lifetime (e.g., 30 minutes)
$sessionLifetime = 30 * 60; // 30 minutes in seconds

// Check if the session has expired
if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $sessionLifetime) {
    // Session has expired, destroy the session
    session_unset();
    session_destroy();
}

// Update the last activity time
$_SESSION['last_activity'] = time();


if (!isset($_SESSION['access'])) {
    header("Location:stafflog.php");
}