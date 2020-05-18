import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "./entity/User";
import { hash } from "bcryptjs";
import * as EmailValidator from 'email-validator';

@Resolver()
export class UserResolver {
  // basic hello query for testing
  @Query(() => String)
  hello() {
    return "hey cutie ;)";
  }

  // add new user
  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("confirmPassword") confirmPasswword: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string
  ) {
    try {

      if (password === confirmPasswword) {
        const hashedPassword = await hash(password, 12);
        const user = new User();

        user.email = email;
        user.password = hashedPassword;
        user.firstName = firstName;
        user.lastName = lastName;
        await User.save(user);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
