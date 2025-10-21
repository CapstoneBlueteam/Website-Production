// === Secure + GMU Styled Version ===
document.addEventListener("DOMContentLoaded", () => {
  console.log("app.js loaded");
  const db = firebase.firestore();

  // Simple hashing function using the Web Crypto API
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }

  // === SIGN UP ===
  const signupBtn = document.getElementById("signup-btn");
  if (signupBtn) {
    console.log(" Signup page detected");
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
        const existing = await db.collection("users").where("username", "==", username).get();
        if (!existing.empty) {
          alert("Username already exists!");
          grecaptcha.reset();
          return;
        }

        const hashed = await hashPassword(password);
        await db.collection("users").add({
          username,
          password: hashed,
          createdAt: new Date()
        });

        alert(" Account created! Please log in.");
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
    console.log(" Login page detected");
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
        const hashed = await hashPassword(password);
        const query = await db.collection("users")
          .where("username", "==", username)
          .where("password", "==", hashed)
          .get();

        if (query.empty) {
          alert("Invalid username or password!");
          grecaptcha.reset();
          return;
        }

        console.log(" Login successful!");
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
