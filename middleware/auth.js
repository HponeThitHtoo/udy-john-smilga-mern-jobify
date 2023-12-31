import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  // console.log(req.cookies);
  /**
   * *jwt (local storage approach)
   * /
  /*
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    // why, well is it 400 or 404?
    // actually 401
    throw new UnauthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1]
   */

  /////////////////////////////////////////

  /**
   * jwt (cookie approach)
   */

  const token = req.cookies.token;
  if (!token) throw new UnauthenticatedError("Authentication Invalid");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload)

    // attach the user request object
    // req.user = payload
    const testUser = payload.userId === "648c1d8a2acacf890377b850";
    req.user = { userId: payload.userId, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export default auth;
