// auth.js - Handle user authentication

document.addEventListener("DOMContentLoaded", function () {
  // Function to get logged in user
  function getLoggedInUser() {
    const userJson = localStorage.getItem("loggedInUser");
    return userJson ? JSON.parse(userJson) : null;
  }

  // Check for login form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Simple validation
      if (!username || !password) {
        alert("Please enter both username and password");
        return;
      }

      // In a real application, you would verify credentials against a server
      // For demo purposes, we'll check against localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => (u.username === username || u.email === username) && u.password === password);

      if (user) {
        // Store logged in user in localStorage (excluding password for security)
        const loggedInUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
        };

        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        // Redirect to home page
        window.location.href = "index.html";
      } else {
        alert("Invalid username or password");
      }
    });
  }

  // Check for signup form
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // Simple validation
      if (!firstName || !lastName || !email || !username || !password) {
        alert("Please fill in all required fields");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      // Check if username or email already exists
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.some((user) => user.username === username)) {
        alert("Username already exists");
        return;
      }

      if (users.some((user) => user.email === email)) {
        alert("Email already in use");
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        username,
        password, // In a real app, never store passwords in plain text!
      };

      // Add to users array
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Auto login
      const loggedInUser = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
      };

      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      // Enhanced success message
      alert("Welcome to Event Discovery! Your account has been created successfully.");

      // Redirect to home page
      window.location.href = "index.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Simulate a function that checks if the user is logged in
  function isUserLoggedIn() {
      // Replace this with your actual logic to check if the user is logged in
      return true; // Assume the user is logged in for demonstration
  }

  if (isUserLoggedIn()) {
      document.getElementById("signUpButton").style.display = "none";
      document.getElementById("logInButton").style.display = "none";
  }
});