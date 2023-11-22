import dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 8080,
  mongodb_uri: process.env.MONGODB_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 8,
};
