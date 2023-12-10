import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Meeting } from "../../meetings/entity/meeting.entity";
import { UserRoleEnum } from "../../../shared/utils/types";


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

  @OneToMany(()=> Meeting, (meeting) => meeting.broker)
  brokerMeetings!:Meeting[]

  @OneToMany(()=> Meeting, (meeting) => meeting.customer)
  customerMeetings!:Meeting[]

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @DeleteDateColumn()
  deletedAt!: string;
}
