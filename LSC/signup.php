<?php require 'validatesignup.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="login.css">
  <link rel="stylesheet" href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css'>
  <link rel="icon" type="image/x-icon" href="Images/Car Sale Website Images/fav-icon.png">
  <title>Los Santos Customs</title>
</head>

<body>
  <header style="background-color: #fff;">

    <nav>
      <a href="JS_index.html" class="logo">Los <span>Santos</span> Customs</a>

      <ul class="navbar">
        <li><a href="JS_index.html">Home</a></li>
        <li><a href="cars.php">Cars</a></li>
        <li><a href="team.html">About</a></li>
      </ul>
    </nav>

  </header>


  <section class="log-in">
    <h1>Sign-Up</h1>

    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">

      <div class="user">
        <input type="text" name="name" id="name" autofocus>
        <span class="error">* <?php echo $nameErr; ?></span>
        <span></span>
        <label for="nname">Name:</label>
      </div>

      <div class="user">
        <input type="text" name="username" id="username" autofocus>
        <span class="error">* <?php echo $usernameErr; ?></span>
        <span></span>
        <label for="username">User Name:</label>
      </div>

      <div class="user">
        <input type="email" name="email" id="email">
        <span class="error">* <?php echo $emailErr; ?></span>
        <span></span>
        <label for="email">Email:</label>
      </div>

      <div class="user">
        <input type="numer" name="phone_number" id="phone_number">
        <span></span>
        <label for="phone_number">Phone number:</label>
      </div>

      <div class="user">
        <input type="password" name="password" id="password">
        <span class="error">* <?php echo $passwordErr; ?></span>
        <img src="Images/Car Sale Website Images/hide_pass.jpg" onclick="pass()" class="pass-icon" id="pass-icon">
        <span></span>
        <label for="password">Password:</label>
      </div>

      <div class="user">
        <input type="password" name="password2" id="password2">
        <span class="error">* <?php echo $passwordErr; ?></span>
        <img src="Images/Car Sale Website Images/hide_pass.jpg" onclick="pass()" class="pass-icon" id="pass-icon">
        <span></span>
        <label for="password">Repeat Password:</label>
      </div>

      <div class="user-pass">
        By signing up, you agree to our <strong>Terms , Privacy Policy and Cookies Policy.
      </div>

      <input type="submit" value="Sign-Up" name = "submit">
      <?php echo $missinginfo; ?>

      <div class="register">
        Have an account? <a href="login.php">Log-In</a>
      </div>
    </form>
  </section>

  <script src="functions.js"></script>
  <script src="main.js"></script>


</body>

</html>