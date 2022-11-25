import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public name: string;

  @Column()
  public lastname: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ nullable: true })
  public city: string | null;

  @Column({ nullable: true })
  public address: string | null;

  @Column({ name: 'date_of_birth', nullable: true })
  public dateOfBirth: Date | null;

  @Column({ name: 'is_admin' })
  public isAdmin: boolean;
}