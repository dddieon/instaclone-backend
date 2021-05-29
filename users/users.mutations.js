import client from "../client";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email, password }) => {
      try {
        // check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/password is already taken");
        }
        const uglyPassword = await bcrpyt.hash(password, 10);
        return client.user.create({data: {
          username, email, firstName, lastName, password: uglyPassword
        }})
      } catch(e) {
        return e;
      }
    },
    login: async (_, {username, password}) => {
      // 1. find user with args.username
      const user = await client.user.findFirst({
        where: {
          username
        }
      })
      if (!user) {
        return ({
          ok: false,
          error: "User not found"
          })
      }
      // 2. hash check ( args.password === DB password)
      const passwordOk = await bcrpyt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password"
        }
      }
      const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY);
      // 3.issue a token -> user
      return {
        ok: true,
        token
      }
    }
  },
};