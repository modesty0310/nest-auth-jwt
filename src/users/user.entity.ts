import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({unique: true})
  email: string;

  @Column({nullable: true})
  password: string;
}