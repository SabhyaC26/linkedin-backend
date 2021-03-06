import { Resolver, Mutation, Arg } from "type-graphql";
import { hash } from "bcryptjs";
import { User } from "../entity/User";
import * as EmailValidator from "email-validator";
import { validate } from "class-validator";
import { getManager } from "typeorm";

@Resolver()
export class AuthResolver {
  // mutation to register a new user
  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("confirmPassword") confirmPassword: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string
  ) {
    // check if passwords match
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match!");
    }

    // check passowrd meets requirements
    var strongRegex = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!strongRegex.test(password)) {
      throw new Error(
        "Password must be at least 8 chars and and must include at least\
         one upper case letter, one lower case letter, one numeric digit,\
         and one special character."
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
      const errors = await validate(user);
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

  // @Mutation(() => Boolean)
  // async login(@Arg("email") email: string, @Arg("password") password: string) {
  //   return true;
  // }
}
