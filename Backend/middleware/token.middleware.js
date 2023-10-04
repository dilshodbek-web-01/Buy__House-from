import jwt from "jsonwebtoken";

const tokenMiddleWare = async (req, res, next) => {
    try {

    const getUserInfo = await jwt.verify(
      req.headers.token,
      process.env.SECRET_KEY
    );

    req.token = getUserInfo;
    next();

    if (!req.headers.token) {
      res.json({ message: "Token is not found !!!." });
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.json({ message: "Token is error" });
    } else {
      return res.json({ message: "token has expired" });
    }
  }
};

export default tokenMiddleWare;
