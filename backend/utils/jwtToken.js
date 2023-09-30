const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();

  // Remove password from output
  user.password = undefined;

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Prevents cookie from being accessed by client-side scripts
  };

  // Set secure to true in production
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  // Send cookie
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, user });
}

export default sendToken;