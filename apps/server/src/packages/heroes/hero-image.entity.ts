import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { HeroEntity } from './hero.entity.js';
import type { ContentType } from '../../libs/enums';

@Entity('hero_images')
class HeroImageEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  binary!: string;

  @Column('varchar', { name: 'content_type' })
  contentType!: ContentType;

  @ManyToOne(() => HeroEntity, (hero) => hero.images, { onDelete: 'CASCADE' })
  hero!: HeroEntity;
}

export { HeroImageEntity };
