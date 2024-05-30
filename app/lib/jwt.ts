import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const jwt_secret = "jjhaggaggs";

const createToken = (payload: any) => {
  const token = jwt.sign(
    {
      payload,
    },
    jwt_secret,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

export default createToken;
