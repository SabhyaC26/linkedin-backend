import { Resolver, Query, Arg } from "type-graphql";
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
    return await User.findOne(id);
  }
}
