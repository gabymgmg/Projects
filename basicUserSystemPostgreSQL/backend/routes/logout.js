const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // Clear the authentication token from the client-side (e.g., delete cookies, clear local storage)
  res.clearCookie('auth_token');
  res.redirect('/login'); // Redirect the user to the login page after logging out
});

module.exports = router;
