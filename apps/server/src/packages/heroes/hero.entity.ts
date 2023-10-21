import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('hero')
class HeroEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column({ name: 'real_name' })
  realName: string;

  @Column({ name: 'origin_description' })
  description: string;

  @Column('varchar', { array: true })
  powers: string[];

  @Column({ name: 'catch_phrase' })
  phrase: string;

  @Column('varchar', { array: true })
  images: Buffer[];

  @Column('date', { name: 'created_at', default: new Date() })
  createdAt: Date;

  @Column('date', { name: 'updated_at', default: new Date() })
  updatedAt: Date;
}

export { HeroEntity };
