import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRoles } from "../config/constants.js";
import { UserRolesType } from "../interfaces/common.js";
// import { UserRefreshToken } from "./UserRefreshToken.js";

@Entity("users")
@Index("UQ_user_email", ["email"], {
  unique: true,
})
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "name", type: "varchar", length: 255 })
  name!: string;

  @Column({ name: "email", type: "varchar", length: 255 })
  email!: string;

  @Column({ name: "password", type: "varchar" })
  password!: string;

  @Column({ name: 'role', type: 'enum', enum: [...Object.values(UserRoles)], default: UserRoles.USER })
  role!: keyof UserRolesType;

  @Column({ name: "reset_token", type: 'text', nullable: true })
  resetToken: string | null = null;

  @CreateDateColumn({ name: "created_at", type: "timestamp", default: 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    nullable: true,
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  // @OneToMany(() => UserRefreshToken, (token) => token.user, { lazy: true })
  // refreshTokens!: UserRefreshToken[];
}
