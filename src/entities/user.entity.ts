import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  password: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  role:
    | "admin"
    | "client"
    | "deliveryMan"
    | "restaurateur"
    | "saleDepartment"
    | "technicalService";

  @Column({ nullable: true })
  referalCode: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  restaurantId: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  sponsor?: User;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  sponsored: any[];

  //Method
}
