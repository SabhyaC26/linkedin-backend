import {
    Entity,
    PrimaryColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    BeforeInsert,
} from "typeorm";

import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User extends BaseEntity {

    @PrimaryColumn("uuid")
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column("varchar", { length: 255, unique: true })
    email: string

    @Column("text")
    password: string

    @Column("varchar", { length: 255, nullable: true })
    firstName: string;

    @Column("varchar", { length: 255, nullable: true })
    lastName: string;

    @Column("integer", { nullable: true })
    age: number;

    @Column("varchar", { length: 255, nullable: true })
    loacation: string;

    @Column("simple-array", { nullable: true })
    companies: string[];

    @BeforeInsert()
    assignUserId() {
        this.id = uuidv4();
    }

}
