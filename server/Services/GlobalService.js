import { createHmac } from "node:crypto";
import JWT from "jsonwebtoken";

class GlobalService {
  JWT_SECRET = "$uperM@n@123";

  decodeJWTToken(token) {
    return JWT.verify(token, this.JWT_SECRET);
  }

  generateHash(salt, password) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }
}

export default GlobalService;
