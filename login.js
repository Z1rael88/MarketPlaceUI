const loginForm = document.querySelector("#login-form");
const errorMessage = document.querySelector("#error-message");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  fetch("https://localhost:5001/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("bearerToken", data.token);
        window.location.href = "products.html"; // Redirect to the products page
      } else {
        errorMessage.textContent = "Invalid email or password.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      errorMessage.textContent = "An error occurred. Please try again.";
    });
});
