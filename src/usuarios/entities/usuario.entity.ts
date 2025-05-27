import { Empresa } from "../../empresa/entities/empresa.entity";
import { Rol } from "../../roles/entities/rol.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     nombre: string;

     @Column()
     cedula: string;

     @Column({ unique: true })
     email: string;

     @Column()
     usuario: string;

     @Column()
     password: string;

     @Column({ default: true })
     estado: boolean;

     @Column({ default: false })
     eliminado: boolean;

     @ManyToOne(() => Empresa, (empresa) => empresa.usuarios)
     @JoinColumn({ name: 'empresa_id' })
     empresa: Empresa;

     @ManyToOne(() => Rol, rol => rol.usuarios, { eager: true })
     @JoinColumn({ name: 'rol_id' })
     rol: Rol;

}

