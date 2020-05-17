import {
    Entity,
    PrimaryColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    BeforeInsert,
} from "typeorm";

import uuidv4 from "uuid/v4";

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

    @Column("varchar", { length: 255 })
    firstName: string;

    @Column("varchar", { length: 255 })
    lastName: string;

    @Column("date")
    birthday: Date;

    @Column()
    loacation: string;

    @Column("simple-array")
    companies: string[];

    @BeforeInsert()
    assignUserId() {
        this.id = uuidv4();
    }

}
