
import { Modulo } from "../../modulos/entities/modulo.entity";
import { RolPermiso } from "../../rol-permisos/entities/rol-permiso.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permiso {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     nombre: string;

     @Column()
     slug: string;

     @ManyToOne(() => Modulo, modulo => modulo.permisos, { eager: true })
     @JoinColumn({ name: 'modulo_id' })
     modulo: Modulo;

     @OneToMany(() => RolPermiso, rp => rp.permiso)
     rolPermisos: RolPermiso[];
}


