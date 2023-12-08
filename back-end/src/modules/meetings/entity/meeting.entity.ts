import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entity/user.entity";

@Entity({ name: "Meentings" })
export class Meeting {
  @PrimaryGeneratedColumn()
  idMeeting!: number;

  @ManyToOne(() => User, (user) => user.idUser)
  @JoinColumn({
    name: "idBroker",
    foreignKeyConstraintName: "Meetings_User_IdBroker_FK",
    referencedColumnName: "idUser",
  })
  @Column()
  idBroker!: number;

  @ManyToOne(() => User, (user) => user.idUser)
  @JoinColumn({
    name: "idCustomer",
    foreignKeyConstraintName: "Meetings_User_IdCustomer_FK",
    referencedColumnName: "idUser",
  })
  @Column()
  idCustomer!: number;

  @Column()
  startAt!: string;

  @Column()
  endAt!: string;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @DeleteDateColumn()
  deletedAt!: string;
}
