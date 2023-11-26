// Event onclick på vores logud knap
const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", () => {
  const storedUserData = localStorage.getItem("userData");

  if (storedUserData === null) {
    alert("You are not currently logged in.");
  } else {
    localStorage.clear();
    alert("You have been logged out.");
  }
});

// Gammel Kode
function login() {
  const storedUserData = localStorage.getItem("userData");

  if (storedUserData !== null) {
    const storedUserObject = JSON.parse(storedUserData);
    const storedUsername = storedUserObject.username;

    alert(`You are already logged in with user: ${storedUsername}`);
    return Promise.resolve();
  }

  const username1 = prompt("Enter username:");
  const password1 = prompt("Enter password:");

  return fetch("http://localhost:3000/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }
      return response.json();
    })
    .then((userData) => {
      console.log(userData);
      const user = userData.find(
        (u) => u.username === username1 && u.password === password1
      );
      if (user) {
        alert("Login successful.");
        localStorage.setItem("userData", JSON.stringify(user));
        return Promise.resolve();
      } else {
        alert("Incorrect username or password.");
        return Promise.reject();
      }
    })
    .catch((error) => {
      console.error(error);
      alert(
        "An error occurred while processing your request. Please try again later."
      );
      return Promise.reject();
    });
}

// Create user event
function createUser() {
  const storedUserData = localStorage.getItem("userData");

  if (storedUserData !== null) {
    alert("Please log out to create a new user.");
    return;
  }

  const username = prompt("Enter username:");
  const password = prompt("Enter password:");

  // POST request to our backend API to create a new user
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (response.ok) {
        alert("User created successfully.");
      } else {
        alert("A user with the given username already exists.");
      }
    })
    .catch((error) => {
      console.error(error);
      alert(
        "An error occurred while processing your request. Please try again later."
      );
    });
}
