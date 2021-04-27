import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AliveEntity } from "../database/alive-entity.entity";
import { Role } from "./role.model";

@Entity({ name: "users" })
export class User extends AliveEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 255 })
  email!: string;

  @Column({ length: 64 })
  password!: string;

  @Column({ length: 32 })
  role!: Role;
}
