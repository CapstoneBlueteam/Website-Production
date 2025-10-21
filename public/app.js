document.addEventListener("DOMContentLoaded", () => {
  console.log("[DEBUG] app.js loaded");

  const auth = firebase.auth();
  const db = firebase.firestore();

  // if no "@" in username, create pseudo email
  function toEmailFormat(input) {
    return input.includes("@") ? input : `${input}@gmu.edu`;
  }

  // SIGN UP
  const signupBtn = document.getElementById("signup-btn");
  if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
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
        // Convert username/email input into a valid email for Firebase
        const emailToUse = toEmailFormat(username);

        // Create account in Firebase Auth
        const cred = await auth.createUserWithEmailAndPassword(emailToUse, password);

        // Save username/email mapping in Firestore
        await db.collection("users").doc(cred.user.uid).set({
          username,
          email: emailToUse,
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
    loginBtn.addEventListener("click", async () => {
      const loginInput = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value.trim();

      if (!grecaptcha.getResponse()) {
        alert("Please verify the CAPTCHA.");document.addEventListener("DOMContentLoaded", () => {
  console.log(" app.js loaded");

  const auth = firebase.auth();
  const db = firebase.firestore();

  // Helper → make sure Firebase got initialized
  if (!auth || !db) {
    console.error("[ERROR] Firebase not initialized. Check /__/firebase/init.js.");
    alert("Firebase not initialized — verify firebase/init.js is loading correctly.");
    return;
  }

  // Helper function: convert username→pseudo email if needed
  function toEmailFormat(input) {
    return input.includes("@") ? input : `${input}@gmu-demo.com`;
  }

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
        const emailToUse = toEmailFormat(username);
        console.log("Attempting signup with:", emailToUse);

        const cred = await auth.createUserWithEmailAndPassword(emailToUse, password);
        console.log("Firebase Auth user created:", cred.user.uid);

        await db.collection("users").doc(cred.user.uid).set({
          username,
          email: emailToUse,
          createdAt: new Date()
        });

        alert("Account created! Please log in.");
        window.location.replace("login.html");
      } catch (err) {
        console.error("[ERROR] Signup failed:", err);
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

      const loginInput = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value.trim();

      if (!grecaptcha.getResponse()) {
        alert("Please verify the CAPTCHA.");
        return;
      }
      if (!loginInput || !password) {
        alert("Please fill in all fields.");
        return;
      }

      try {
        const emailToUse = toEmailFormat(loginInput);
        console.log(" Attempting login with:", emailToUse);

        await auth.signInWithEmailAndPassword(emailToUse, password);

        const usernameToShow = loginInput.includes("@")
          ? loginInput.split("@")[0]
          : loginInput;

        sessionStorage.setItem("username", usernameToShow);
        console.log(" Login success — redirecting");
        window.location.replace("index.html");
      } catch (err) {
        console.error("[ERROR] Login failed:", err);
        alert("Invalid username or password!");
      } finally {
        grecaptcha.reset();
      }
    });
  }
});

        return;
      }
      if (!loginInput || !password) {
        alert("Please fill in all fields.");
        return;
      }

      try {
        const emailToUse = toEmailFormat(loginInput);

        // Authenticate using Firebase Auth
        await auth.signInWithEmailAndPassword(emailToUse, password);

        // Save the display username (if they used an email, use that before "@")
        const usernameToShow = loginInput.includes("@")
          ? loginInput.split("@")[0]
          : loginInput;

        sessionStorage.setItem("username", usernameToShow);
        window.location.replace("index.html");
      } catch (err) {
        console.error("Login error:", err);
        alert("Invalid username or password!");
      } finally {
        grecaptcha.reset();
      }
    });
  }
});
