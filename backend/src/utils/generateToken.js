import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const  JWT_SECRET  = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId },JWT_SECRET, {
    expiresIn: "7d",
  });


  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Mili seconds
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: "strict", // CSRF attacks
  });

  return token; 
};

export default generateToken;
