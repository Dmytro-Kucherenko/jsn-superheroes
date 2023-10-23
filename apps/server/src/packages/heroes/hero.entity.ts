import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HeroImageEntity } from './hero-image.entity.js';

@Entity('heroes')
class HeroEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nickname!: string;

  @Column({ name: 'real_name' })
  realName!: string;

  @Column({ name: 'origin_description' })
  description!: string;

  @Column('varchar')
  powers!: string;

  @Column({ name: 'catch_phrase' })
  phrase!: string;

  @Column('date', { name: 'created_at', default: new Date() })
  createdAt!: Date;

  @Column('date', { name: 'updated_at', default: new Date() })
  updatedAt!: Date;

  @OneToMany(() => HeroImageEntity, image => image.hero, { cascade: ['insert', 'update'] })
  images!: HeroImageEntity[];
}

export { HeroEntity };
