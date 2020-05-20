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
import { MinLength, MaxLength, IsAlphanumeric, IsEmail } from "class-validator";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn("uuid")
  id: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column("varchar", { length: 255, unique: true })
  @IsEmail()
  email: string;

  @Field()
  @Column("boolean", { default: false })
  verified: boolean;

  @Column("text")
  @MinLength(8)
  @MaxLength(26)
  @IsAlphanumeric()
  password: string;

  @Field()
  @Column("varchar", { length: 255 })
  firstName: string;

  @Field()
  @Column("varchar", { length: 255 })
  lastName: string;

  @Field(() => Int)
  @Column("integer", { default: -1 })
  age: number;

  @Field()
  @Column("varchar", { length: 255, default: "location" })
  loacation: string;

  @Field(() => [String])
  @Column("simple-array", { default: [] })
  companies: string[];

  @BeforeInsert()
  assignUserId() {
    this.id = uuidv4();
  }
}
