import { Resolver, Query, Mutation, Arg } from "type-graphql";

@Resolver()
export class UserResolver {
  // basic hello query for testing
  @Query(() => String)
  hello() {
    return "hey cutie ;)";
  }

  // add new user
  @Mutation(() => String)
  register(
    @Arg("email") email: String,
    @Arg("password") password: String,
    @Arg("confirmPassword") confirmPasswword: String
  ) {
    return `${email}, ${password}, ${confirmPasswword}`;
  }
}
