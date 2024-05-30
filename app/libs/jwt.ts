import jwt from "jsonwebtoken";

const jwt_secret = "hsuayagqyy";

const createToken = (payload: any) => {
  const token = jwt.sign({ payload }, jwt_secret, {
    expiresIn: "24h",
  });
  return token;
};

export default createToken;
