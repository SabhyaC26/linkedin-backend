import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../entity/User";
import { validate } from "class-validator";
import { getManager } from "typeorm";

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
  @Mutation()
  async updateUserEmail(
    @Arg("id") id: string,
    @Arg("newEmail") newEmail: string
  ) {
    var user = await User.findOne(id);
    if (!user) {
      throw new Error("User not found!");
    }
    user.email = newEmail;
    User.save(user);
    const errors = await validate(user);
    if (errors.length > 0) {
      console.log(errors);
      throw new Error("Validation checks on updated user failed!");
    } else {
      getManager().save(user);
    }
  }

  // mutation to change user firstName
  @Mutation()
  async updateUserfirstName(
    @Arg("id") id: string,
    @Arg("newfirstName") newfirstName: string
  ) {
    var user = await User.findOne(id);
    if (!user) {
      throw new Error("User not found!");
    }
    user.firstName = newfirstName;
    User.save(user);
    const errors = await validate(user);
    if (errors.length > 0) {
      console.log(errors);
      throw new Error("Validation checks on updated user failed!");
    } else {
      getManager().save(user);
    }
  }

  // mutation to change user lastName
  @Mutation()
  async updateUserlastName(
    @Arg("id") id: string,
    @Arg("newlastName") newlastName: string
  ) {
    var user = await User.findOne(id);
    if (!user) {
      throw new Error("User not found!");
    }
    user.lastName = newlastName;
    User.save(user);
    const errors = await validate(user);
    if (errors.length > 0) {
      console.log(errors);
      throw new Error("Validation checks on updated user failed!");
    } else {
      getManager().save(user);
    }
  }

  // mutation to change user Location
  @Mutation()
  async updateUserLocation(
    @Arg("id") id: string,
    @Arg("newLocation") newLocation: string
  ) {
    var user = await User.findOne(id);
    if (!user) {
      throw new Error("User not found!");
    }
    user.location = newLocation;
    User.save(user);
    const errors = await validate(user);
    if (errors.length > 0) {
      console.log(errors);
      throw new Error("Validation checks on updated user failed!");
    } else {
      getManager().save(user);
    }
  }
}
