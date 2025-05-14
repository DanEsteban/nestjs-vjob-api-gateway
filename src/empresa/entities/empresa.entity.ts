import { EmpresaModulo } from "../../empresa-modulos/entities/empresa-modulo.entity";
import { Rol } from "../../roles/entities/rol.entity";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Empresa {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     nombre: string;

     @Column()
     ruc: string;

     @Column()
     email: string;

     @Column()
     telefono: string;

     @Column()
     direccion: string;

     @Column({ nullable: true })
     logo_url: string;

     @Column()
     dominio: string;

     @Column({ default: true })
     estado: boolean = true;

     @OneToMany(() => Rol, rol => rol.empresa)
     roles: Rol[];

     @OneToMany(() => Usuario, usuario => usuario.empresa)
     usuarios: Usuario[];

     @OneToMany(() => EmpresaModulo, empresaModulo => empresaModulo.empresa, { cascade: true })
     empresaModulo: EmpresaModulo[]; // Cambiado de empresa_modulos a modulos
}


