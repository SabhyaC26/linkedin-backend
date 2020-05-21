import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  // query to get all users
  @Query(() => [User])
  async users() {
    return await User.find();
  }

  // query to find user by id
  @Query(() => User)
  async user(@Arg("id") id: string) {
    const user = await User.findOne(id);
    if (!user) {
      throw new Error("User not found!");
    }
    return user;
  }

  // mutation to change user email
  // @Mutation()
  // async updateUserEmail(
  //   @Arg("id") id: string,
  //   @Arg("newEmail") newEmail: string
  // ) {

  // }
}
