import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRoleEnum } from "../../../constants/index.constant";

@Entity({name: 'Users'})
export class User {
  @PrimaryGeneratedColumn()
  idUser!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: "enum",
    enum: UserRoleEnum,
  })
  role!: string;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @DeleteDateColumn()
  deletedAt!: string;
}
