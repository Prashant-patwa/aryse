The session itself is the proof of login.

When login succeeds, we created:

req.session.user = {
    email: email
};

Later, every request carries the session cookie → Express finds that session → req.session.user is available.

This line detects whether the user is logged in:

if (!req.session.user)

So:

Logged in
→ req.session.user exists
→ condition is false
→ allow access

Not logged in
→ req.session.user doesn't exist
→ condition is true
→ return 401

That's the core idea of session-based authentication.