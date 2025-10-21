
document.addEventListener("DOMContentLoaded", () => {
  console.log("app.js loaded");

  const db = firebase.firestore();

  // === SIGN UP ===
  const signupBtn = document.getElementById("signup-btn");
  if (signupBtn) {
    console.log("Signup page detected");
    signupBtn.addEventListener("click", async () => {
      console.log("Signup button clicked");
      const username = document.getElementById("signup-username").value.trim();
      const password = document.getElementById("signup-password").value.trim();

      if (!grecaptcha.getResponse()) {
        alert("Please verify the CAPTCHA.");
        return;
      }
      if (!username || !password) {
        alert("Please fill in all fields.");
        return;
      }

      try {
        const existing = await db.collection("users")
          .where("username", "==", username)
          .get();

        if (!existing.empty) {
          alert("Username already exists!");
          grecaptcha.reset();
          return;
        }

        await db.collection("users").add({
          username,
          password, 
          createdAt: new Date()
        });

        alert("Account created! Please log in.");
        window.location.replace("login.html");
      } catch (err) {
        console.error("Signup error:", err);
        alert("Error: " + err.message);
      } finally {
        grecaptcha.reset();
      }
    });
  }

  // === LOGIN ===
  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    console.log("Login page detected");
    loginBtn.addEventListener("click", async () => {
      console.log("Login button clicked");
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value.trim();

      if (!grecaptcha.getResponse()) {
        alert("Please verify the CAPTCHA.");
        return;
      }
      if (!username || !password) {
        alert("Please fill in all fields.");
        return;
      }

      try {
        const query = await db.collection("users")
          .where("username", "==", username)
          .where("password", "==", password)
          .get();

        if (query.empty) {
          alert("Invalid username or password!");
          grecaptcha.reset();
          return;
        }

        console.log("Login successful!");
        sessionStorage.setItem("username", username);
        window.location.replace("index.html");
      } catch (err) {
        console.error("Login error:", err);
        alert("Error: " + err.message);
      } finally {
        grecaptcha.reset();
      }
    });
  }
});
