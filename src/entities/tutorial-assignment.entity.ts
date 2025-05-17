import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { TutorialRequest } from "./tutorial-request.entity";

@Entity()
@Entity()
export class TutorialAssignment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => TutorialRequest)
  tutorialRequest: TutorialRequest;

  @ManyToOne(() => User)
  tutor: User;

  @ManyToOne(() => User)
  assignedBy: User;

  @CreateDateColumn()
  assignedAt: Date;
}
