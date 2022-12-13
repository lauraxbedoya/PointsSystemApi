import { User } from "src/api/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_credits')
export class Credits extends BaseEntity {

  @Column({ unique: true })
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  userId: number

  @Column()
  credits: number

  @OneToOne(() => User, (user) => user.credits)
  @JoinColumn({ name: 'userId' })
  user: User
}