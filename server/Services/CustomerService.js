import JWT from "jsonwebtoken";
import { randomBytes } from "node:crypto";
import CustomerModel from "../Models/CustomerModel.js";
import GlobalService from "./GlobalService.js";

class CustomerService extends GlobalService {
  constructor() {
    super(); // Call the constructor of the base class
  }

  getUserById(id) {
    return CustomerModel.findById({ where: { id } });
  }

  createUser(payload) {
    console.log(`payload:`, payload);
    const { firstName, lastName, email, password } = payload;

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = this.generateHash(salt, password);

    return CustomerModel.create({
      firstName,
      user_name: firstName[0],
      display_name: firstName + lastName,
      lastName,
      email,
      salt,
      password: hashedPassword,
    });
  }

  getUserByEmail(email) {
    return CustomerModel.findOne({ where: { email } });
  }

  async getUserToken(payload) {
    const { email, password } = payload;
    const user = await this.getUserByEmail(email);
    if (!user) throw new Error("user not found");

    const userSalt = user.salt;
    const usersHashPassword = this.generateHash(userSalt, password);

    if (usersHashPassword !== user.password)
      throw new Error("Incorrect Password");

    // Gen Token
    const token = JWT.sign({ id: user.id, email: user.email }, this.JWT_SECRET);
    return token;
  }
}

export default CustomerService;
