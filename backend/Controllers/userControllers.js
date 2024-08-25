const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "30d";

// Register route
const register = async (req, res) => {
  const { username, email, password, bio, profile_picture } = req.body;
  const db = req.app.locals.db;

  try {
    const checkUserOrEmail =
      "SELECT * FROM Users WHERE username = ? OR email = ?";
    const existingUser = await new Promise((resolve, reject) => {
      db.get(checkUserOrEmail, [username, email], (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });

    if (existingUser) {
      if (existingUser.username === username && existingUser.email === email) {
        return res.status(400).send("Both username and email already exist");
      } else if (existingUser.username === username) {
        return res.status(400).send("Username already exists");
      } else if (existingUser.email === email) {
        return res.status(400).send("Email already exists");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUser = `
      INSERT INTO Users (username, email, password, bio, profile_picture, role)
      VALUES (?, ?, ?, ?, ?, ?)`;

    await new Promise((resolve, reject) => {
      db.run(
        insertUser,
        [
          username,
          email,
          hashedPassword,
          bio || null,
          profile_picture || null,
          "user",
        ],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Login route
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const db = req.app.locals.db;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  try {
    db.get(
      "SELECT * FROM Users WHERE username = ?",
      [username],
      async (err, user) => {
        if (err) {
          return res.status(500).send("Database error");
        }
        if (!user) {
          return res.status(401).send("User not found");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res.status(401).send("Invalid password");
        }

        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN }
        );
        res.json({ token });
      }
    );
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Get profile by user ID
const getProfileById = (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  const query = `SELECT id, username, email, bio, profile_picture, role, created_at, updated_at FROM Users WHERE id = ?`;

  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(row);
  });
};

module.exports = { register, loginUser, getProfileById };
