import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class CanvasItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.canvasItems, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  type: string; 

  @Column('text')
  content: string;

  @Column('float')
  x: number;

  @Column('float')
  y: number;

  @Column('float', { nullable: true })
  width: number;

  @Column('float', { nullable: true })
  height: number;

  @CreateDateColumn()
  created_at: Date;
}