import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRoleEnum } from "../../utils/types";
import { Meeting } from "../../meetings/entity/meeting.entity";


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

  @OneToMany(()=> Meeting, (meeting) => meeting.idBroker)
  brokerMeetings!:Meeting[]

  @OneToMany(()=> Meeting, (meeting) => meeting.idCostumer)
  costumerMeetings!:Meeting[]

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @DeleteDateColumn()
  deletedAt!: string;
}
