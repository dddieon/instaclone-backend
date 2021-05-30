import client from "../../client";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
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