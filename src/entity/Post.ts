import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  BeforeInsert,
} from "typeorm";

import { v4 as uuidv4 } from "uuid";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryColumn("uuid")
  id: String;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  user: User;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  body: string;

  @BeforeInsert()
  assignUserId() {
    this.id = uuidv4();
  }
}
