
import { Permiso } from "../../permisos/entities/permiso.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Modulo {

     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     nombre: string;

     @OneToMany(() => Permiso, permiso => permiso.modulo)
     permisos: Permiso[];
}
