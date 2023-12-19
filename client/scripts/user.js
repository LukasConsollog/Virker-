//Funktion til client side hashing
async function hashPassword(password, iterations = 4) {
  let hashedPassword = password;

  for (let i = 0; i < iterations; i++) {
    const encoder = new TextEncoder();
    const data = encoder.encode(hashedPassword);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    hashedPassword = Array.from(new Uint8Array(hashBuffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  return hashedPassword;
}
// Dovn Event onclick på vores logud knap (Clear localhost)
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

async function login() {
  const storedUserData = localStorage.getItem("userData");

  if (storedUserData !== null) {
    const storedUserObject = JSON.parse(storedUserData);
    const storedUsername = storedUserObject.username;

    alert(`You are already logged in with user: ${storedUsername}`);
    return Promise.resolve();
  }

  const username = prompt("Enter username:");
  const password = prompt("Enter password:");

  // Client-side hash
  const hashedPassword = await hashPassword(password);

  return fetch("/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }
      return response.json();
    })
    .then((userData) => {
      const user = userData.find(
        (u) => u.username === username && u.password === hashedPassword
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

function createUser() {
  const storedUserData = localStorage.getItem("userData");

  if (storedUserData !== null) {
    alert("Please log out to create a new user.");
    return;
  }

  const username = prompt("Enter username:");
  const password = prompt("Enter password:");

  fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      console.log(response);
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
