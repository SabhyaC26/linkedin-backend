import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "./entity/User";
import { hash } from "bcryptjs";
import * as EmailValidator from "email-validator";
import { validate } from "class-validator";
import { getManager } from "typeorm";

@Resolver()
export class UserResolver {
  // basic hello query for testing
  @Query(() => String)
  hello() {
    return "hey cutie ;)";
  }

  // query to get all users
  @Query(() => [User])
  users() {
    return User.find();
  }

  // mutation to add new user
  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("confirmPassword") confirmPasswword: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string
  ) {
    // check if passwords match
    if (password !== confirmPasswword) {
      throw new Error("Passwords do not match!");
    }

    // check passowrd meets requirements
    const passwordRegex = RegExp("^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,36}$");
    if (!passwordRegex.test(password)) {
      throw new Error(
        "Password must be between 8-36 chars and and must include at least\
         one upper case letter, one lower case letter, and one numeric digit."
      );
    }

    // check if the email is valid
    if (!EmailValidator.validate(email)) {
      throw new Error("Invalid email!");
    }

    // try to add the user to the DB
    try {
      const hashedPassword = await hash(password, 12);

      // set user params
      const user = new User();
      user.email = email;
      user.password = hashedPassword;
      user.firstName = firstName;
      user.lastName = lastName;
      // run validation checks and save user
      const errors = await validate(this.users);
      if (errors.length > 0) {
        console.log(errors);
        throw new Error("Validation checks on user failed!");
      } else {
        getManager().save(user);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
