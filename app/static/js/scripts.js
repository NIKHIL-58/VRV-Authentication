document.addEventListener("DOMContentLoaded", () => {
  const loginText = document.querySelector(".title-text .login");
  const loginForm = document.querySelector("form.login");
  const signupForm = document.querySelector("form.signup");
  const loginBtn = document.querySelector("label.login");
  const signupBtn = document.querySelector("label.signup");
  const signupLink = document.querySelector("form .signup-link a");
  const logoutButton = document.getElementById("logoutButton");
  
  


  if (signupBtn && loginForm && loginText) {
    signupBtn.addEventListener("click", () => {
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
    });
  }

  if (loginBtn && loginForm && loginText) {
    loginBtn.addEventListener("click", () => {
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
    });
  }

  if (signupLink && signupBtn) {
    signupLink.addEventListener("click", () => {
      signupBtn.click();
      return false;
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      try {
        const response = await fetch("http://127.0.0.1:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          // Show success notification
          displayNotification("success", "Login successful!");

          // Redirect to home page after a short delay
          setTimeout(() => {
            window.location.href = "/home";
          }, 1500); // Adjust the delay as needed
        } else {
          // Show error notification with server-provided message
          displayNotification(
            "error",
            data.message || "Invalid email or password."
          );
        }
      } catch (error) {
        console.error("Login error:", error);
        // Show error notification for network or other unexpected errors
        displayNotification(
          "error",
          "An error occurred while trying to log in. Please try again later."
        );
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Collect form values
      const name = document.getElementById("signup-name").value.trim();
      const mobile = document.getElementById("signup-mobile").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value;
      const confirmpassword = document.getElementById(
        "signup-confirm-password"
      ).value;

      // Name validation: ensure it doesn't contain numbers
      if (!/^[a-zA-Z\s]+$/.test(name)) {
        displayNotification(
          "error",
          "Name cannot contain numbers or special characters."
        );
        return;
      }

      // Mobile validation: ensure it contains only numbers and is 10 digits
      if (!/^\d{10}$/.test(mobile)) {
        displayNotification(
          "error",
          "Mobile number must be exactly 10 digits."
        );
        return;
      }

      if (!name || !mobile || !email || !password || !confirmpassword) {
        displayNotification("error", "All fields are required.");
        return;
      }

      // Email format validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        displayNotification("error", "Invalid email format.");
        return;
      }

      // Password validation
      if (password !== confirmpassword) {
        displayNotification("error", "Passwords do not match.");
        return;
      }

      // Advanced Password Validation
      const passwordErrors = [];
      if (password.length < 6) {
        passwordErrors.push("at least 6 characters");
      }
      if (!/[a-z]/.test(password)) {
        passwordErrors.push("lowercase");
      }
      if (!/[A-Z]/.test(password)) {
        passwordErrors.push("uppercase");
      }
      if (!/[0-9]/.test(password)) {
        passwordErrors.push("number");
      }
      if (!/[!@#$%^&*()_+{}\[\]:;\"'<>,.?/~`\\|-]/.test(password)) {
        passwordErrors.push("special character");
      }

      if (passwordErrors.length > 0) {
        displayNotification(
          "error",
          `Password must include ${passwordErrors.join(", ")}.`
        );
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:5000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            mobile,
            email,
            password,
            confirmpassword,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          displayNotification(
            "success",
            data.message || "User registered successfully!"
          );
          setTimeout(() => {
            window.location.href = "/index";
          }, 1000); // Redirect after 1 second if signup is successful
        } else {
          displayNotification("error", data.message || "Signup failed.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        displayNotification(
          "error",
          "An error occurred. Please try again later."
        );
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      fetch("http://127.0.0.1:5000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      })
        .then((response) => {
          if (response.ok) {
            displayNotification("success", "Logout successful.");
            setTimeout(() => {
              window.location.href = "/index"; // Redirect to login page after successful logout
            }, 2000);
          } else {
            displayNotification("error", "Logout failed. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error during logout:", error);
          displayNotification("error", "Logout failed. Please try again.");
        });
    });
  }


  function togglePasswordVisibility(toggleId, inputId) {
    const toggleIcon = document.getElementById(toggleId);
    const passwordField = document.getElementById(inputId);

    if (toggleIcon && passwordField) {
      toggleIcon.addEventListener("click", function () {
        const type =
          passwordField.getAttribute("type") === "password"
            ? "text"
            : "password";
        passwordField.setAttribute("type", type);
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
      });
    }
  }

  togglePasswordVisibility("toggle-login-password", "login-password");
  togglePasswordVisibility("toggle-signup-password", "signup-password");
  togglePasswordVisibility(
    "toggle-signup-confirm-password",
    "signup-confirm-password"
  );



  function displayNotification(type, message) {
    // Generate a unique ID for this message
    const uniqueId = `messageContainer_${new Date().getTime()}`;

    // Create the message container
    let messageContainer = document.createElement("div");
    messageContainer.id = uniqueId;
    messageContainer.style.position = "fixed";
    messageContainer.style.top = "10%";
    messageContainer.style.right = "0px";
    messageContainer.style.padding = "10px 20px";
    messageContainer.style.borderRadius = "10px";
    messageContainer.style.zIndex = "1000px";
    messageContainer.style.transition = "opacity 0.5s ease-in-out";
    messageContainer.style.opacity = "0"; // Initially invisible

    // Create the message text element
    let messageText = document.createElement("span");
    messageText.innerText = message;
    messageContainer.appendChild(messageText);

    // Apply styling based on message type
    if (type === "success") {
      messageContainer.style.backgroundColor = "#4CAF50"; // green
      messageContainer.style.color = "#fff";
    } else if (type === "error") {
      messageContainer.style.backgroundColor = "#f44336"; // red
      messageContainer.style.color = "#fff";
    } else if (type === "info") {
      messageContainer.style.backgroundColor = "#2196F3"; // blue
      messageContainer.style.color = "#fff";
    }

    // Append the message container to the body
    document.body.appendChild(messageContainer);

    // Fade in the message
    setTimeout(() => {
      messageContainer.style.opacity = "1";
    }, 10); // Small delay to ensure transition works

    // Hide and remove the message after 5 seconds
    setTimeout(() => {
      messageContainer.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 300); // Wait for the transition to complete before removing
    }, 3000);
  }

});
