import CustomerService from "../Services/CustomerService.js";
import BaseResolver from "./BaseResolver.js";

class CustomerResolver extends BaseResolver {
  customerService;

  constructor() {
    super();
    this.customerService = new CustomerService();
  }

  async getUserToken(_, parameters, context) {
    const payload = {
      email: parameters.email,
      password: parameters.password,
    };

    const token = await this.customerService.getUserToken(payload);
    return token;
  }

  async getCurrentLoggedInUser(_, parameters, context) {
    if (context && context.user) {
      const id = context.user.id;
      const user = await this.customerService.getUserById(id);
      return user;
    }

    throw new Error("I don't know who the fuck you are");
  }

  async createUser(_, payload) {
    try {
      const { firstName, lastName, email, password } = payload?.input || {};

      console.log(`createCustomer.createUser`);
      const res = await this.customerService.createUser({
        firstName,
        lastName,
        email,
        password,
      });
      return {
        message: `Customer is created with id: ${res?.id}`,
        status: true,
      };
    } catch (error) {
      return {
        message: `Something wents wrong. Error : ${error}`,
        status: true,
      };
    }
  }
}

const customerResolver = new CustomerResolver();

const graphqlCustomerResolver = {
  Query: {
    getCustomerToken: customerResolver.getUserToken.bind(customerResolver),
    getCurrentLoggedInUser:
      customerResolver.getCurrentLoggedInUser.bind(customerResolver),
  },
  Mutation: {
    createCustomer: customerResolver.createUser.bind(customerResolver),
  },
};

export const resolvers = graphqlCustomerResolver;
