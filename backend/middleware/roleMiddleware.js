exports.isAdmin = (req, res, next) => {
  const role = req.headers["x-user-role"];
  if (role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admin only!" });
  }
};

exports.isUser = (req, res, next) => {
  const role = req.headers["x-user-role"];
  const userId = req.headers["x-user-id"];

  if (role === "user" && userId) {
    next();
  } else {
    return res.status(403).json({ message: "User only!" });
  }
};
