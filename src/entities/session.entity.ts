import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { TutorialRequest } from "./tutorial-request.entity";

@Entity()
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => TutorialRequest)
  tutorialRequest: TutorialRequest;

  @ManyToOne(() => User)
  tutor: User;

  @ManyToOne(() => User)
  student: User;

  @Column()
  scheduledAt: Date;

  @Column({ default: "scheduled" })
  status: "scheduled" | "completed";

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
