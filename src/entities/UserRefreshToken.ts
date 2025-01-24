import { Entity, JoinColumn, ManyToOne, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";

@Entity('user_refresh_tokens')
export class UserRefreshToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "user_id" })
  userId!: number;

  @Column({ name: 'token', type: 'text', nullable: true })
  token!: string | null;

  @Column({ name: "expires_at", type: "timestamp" })
  expiresAt!: Date;

  @Column({ name: 'is_revoked', type: 'boolean', default: false})
  isRevoked!: boolean;
  
  @Column({
    name: "created_at",
    type: "timestamp",
    default: "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @Column({
    name: "updated_at",
    type: "timestamp",
    nullable: true,
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.refreshTokens, { lazy: true })
  @JoinColumn({ name: "user_id" })
  user!: Promise<User>;
}
