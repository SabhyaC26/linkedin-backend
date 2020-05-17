import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "./entity/User";

@Resolver()
export class UserResolver {
  // basic hello query for testing
  @Query(() => String)
  hello() {
    return "hey cutie ;)";
  }

  // add new user
  @Mutation(() => String)
  async register(
    @Arg("email") email: String,
    @Arg("password") password: String,
    @Arg("confirmPassword") confirmPasswword: String
  ) {

    await User.insert({
      email,
      password
    })

    return;
  }
}
