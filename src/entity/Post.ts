import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  BeforeInsert,
} from "typeorm";

import { v4 as uuidv4 } from "uuid";
import { ObjectType, Field, Int } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryColumn("uuid")
  id: String;
}
