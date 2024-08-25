// Controller function to insert a new post
const createPost = (req, res) => {
  const { user_id, title, content } = req.body;
  const db = req.app.locals.db;

  if (!user_id || !title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `INSERT INTO Posts (user_id, title, content) VALUES (?, ?, ?)`;

  db.run(query, [user_id, title, content], function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      user_id,
      title,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  });
};

// Controller function to get all posts
const getPosts = (req, res) => {
  const db = req.app.locals.db;

  const query = `SELECT * FROM Posts`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json(rows);
  });
};

// Controller function to get a post by ID
const getPostsById = (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  // Query to get the post details
  const postQuery = `SELECT * FROM Posts WHERE id = ?`;

  db.get(postQuery, [id], (err, post) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Query to get the user details based on user_id from the post
    const userQuery = `SELECT username FROM Users WHERE id = ?`;

    db.get(userQuery, [post.user_id], (err, user) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Combine post and user details in the response
      res.status(200).json({
        id: post.id,
        user_id: post.user_id,
        title: post.title,
        content: post.content,
        created_at: post.created_at,
        updated_at: post.updated_at,
        username: user.username,
      });
    });
  });
};

module.exports = {
  createPost,
  getPosts,
  getPostsById,
};
