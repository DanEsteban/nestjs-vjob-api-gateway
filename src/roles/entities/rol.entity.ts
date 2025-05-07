import { Empresa } from '../../empresa/entities/empresa.entity';
import { RolPermiso } from '../../rol-permisos/entities/rol-permiso.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import {
     Column,
     Entity,
     JoinColumn,
     ManyToOne,
     OneToMany,
     PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class Rol {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     nombre: string;

     @Column()
     estado: boolean;

     @ManyToOne(() => Empresa, empresa => empresa.roles, { eager: true })
     @JoinColumn({ name: 'empresa_id' })
     empresa:Empresa;

     @OneToMany(() => RolPermiso, (rp ) => rp.rol, { cascade: true })
     rolPermisos: RolPermiso[];

     @OneToMany(() => Usuario, usuario => usuario.rol)
     usuarios: Usuario[];
}

