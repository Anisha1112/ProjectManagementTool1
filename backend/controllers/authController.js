if (!email || !password) {
  return res.status(400).json({
    success: false,
    message: "All fields required"
  });
}
