import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AliveEntity {
  // Some stuff to think about (nominal/brand typing) :
  // https://medium.com/tales-of-libeo/typeorm-best-practices-using-typescript-and-nestjs-at-libeo-b02b7d1ed2eb
  // https://basarat.gitbook.io/typescript/main-1/nominaltyping
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: () => new Date().getTime() / 1000 })
  createdAt!: number;

  @Column({ default: null })
  updatedAt: number;
}
