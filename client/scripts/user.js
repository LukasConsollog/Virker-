let isAuthenticated = false;
let currentUser = localStorage.getItem("currentUser") || null;

let users = JSON.parse(localStorage.getItem("users")) || [];

function login() {
  if (!isAuthenticated) {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");
    if (username && password) {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        isAuthenticated = true;
        currentUser = username; // Set currentUser to the username
        localStorage.setItem("currentUser", currentUser);
        alert("Login successful: " + currentUser);
      } else {
        alert("Invalid username or password.");
      }
    }
  } else {
    alert("Already logged in: " + currentUser);
  }
}

function logout() {
  if (isAuthenticated) {
    isAuthenticated = false;
    currentUser = null;
    localStorage.removeItem("currentUser");
    alert("Logout successful");
  } else {
    alert("Not logged in");
  }
}

function createUser() {
  if (!isAuthenticated) {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");
    if (username && password) {
      const newUser = { username, password };
      users.push(newUser);
      updateLocalStorage();
      alert("User created: " + username);
    } else {
      alert("Invalid username or password.");
    }
  } else {
    alert("Please logout before creating a new user.");
  }
}

function updateLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}
