import client from "../db/config.js";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  const { user_name, user_email, user_role, user_password } = req.body;

  let admin = await client.query(
    ` SELECT * FROM users WHERE user_name = $1 and user_email = $2`,
    [user_name, user_email]
  );

  if (admin.rowCount === 0)
    return res.status(404).json({ msg: "Admin not found" });

  if (admin.rows[0].user_password !== user_password)
    return res.status(400).json({ msg: "Password incorrect" });

  res.status(200).json({
    msg: "Logged in successfully",
    token: jwt.sign(admin.rows[0].user_id, process.env.SECRET_KEY, {}),
  });
};

export { createUser };
