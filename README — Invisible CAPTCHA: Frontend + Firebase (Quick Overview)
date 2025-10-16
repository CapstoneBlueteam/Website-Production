
Status: Draft / Team responsibility statement
Owners: Frontend team (HTML/CSS/JS) + Backend (Firebase)
Purpose: build a vanilla-frontend website (HTML, CSS, JS) that connects to Firebase to authenticate users and collect telemetry used by our Invisible CAPTCHA research: user IDs, authentication data (managed securely), behavioral signals (mouse movement, clicks, timing), and TLS fingerprint metadata. This README explains what we collect, why, how we store it, and the security & privacy safeguards the team must follow.

1. High-level summary

We are responsible for delivering a static, vanilla-frontend site that:

Uses Firebase Auth for sign-up / sign-in (avoid storing plaintext passwords).

Records user behavior signals (mouse movement, clicks, input timings) and event metadata to Cloud Firestore (or Firebase Realtime DB) for analysis.

Collects TLS fingerprinting metadata (only what is necessary and legal).
