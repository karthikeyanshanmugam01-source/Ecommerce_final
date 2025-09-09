const {User} = require('../models/user.model');

// Create a new user
exports.createUser = async (req, res) => {
  try {
   // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    // Optionally check if email already exists
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    //Create a new user 
    const { username, email, password_hash, client_id, bu_id, user_type } = req.body;
    const newUser = await User.create({
      username,
      email,
      password_hash,
      client_id,
      bu_id,
      user_type
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

  // Login a user with username and password
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // Check if user exists and the password is correct
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
    }

    // User authenticated, return a success message and user data
    res.status(200).json({
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        user_type: user.user_type,
        is_active: user.is_active,
        last_login: user.last_login
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Login error', error: error.message });
  }
};