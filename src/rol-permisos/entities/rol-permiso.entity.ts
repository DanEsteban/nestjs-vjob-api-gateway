import { Permiso } from '../../permisos/entities/permiso.entity';
import { Rol } from '../../roles/entities/rol.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RolPermiso {
     @PrimaryGeneratedColumn()
     id: number;

     @ManyToOne(() => Rol, rol => rol.rolPermisos, { onDelete: 'CASCADE' })
     @JoinColumn({ name: 'rol_id' })
     rol: Rol;

     @ManyToOne(() => Permiso, permiso => permiso.rolPermisos, { onDelete: 'CASCADE' })
     @JoinColumn({ name: 'permiso_id' })
     permiso: Permiso;
}

