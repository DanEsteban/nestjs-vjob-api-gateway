
import { EmpresaModulo } from "../../empresa-modulos/entities/empresa-modulo.entity";
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

     @Column({ default: false })
     is_admin: boolean;

     @OneToMany(() => EmpresaModulo, (empresaModulo) => empresaModulo.modulo, { cascade: true })
     empresaModulo: EmpresaModulo[];
}

