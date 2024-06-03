const registerForm = document.querySelector("#register-form");
const regErrorMessage = document.querySelector("#reg-error-message");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.querySelector("reg-email").ariaValueMax;
  const password = document.querySelector("reg-password").ariaValueMax;

  fetch("https://localhost:5001/api/users/register"), //check this ASAP
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          window.location.href = "login.html"; // Redirect to the login page
        } else {
          regErrorMessage.textContent =
            "Registration failed. User may already exist.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        regErrorMessage.textContent = "An error occurred. Please try again.";
      });
});
