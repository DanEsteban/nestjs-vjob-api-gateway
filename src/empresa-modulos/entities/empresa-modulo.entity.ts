import { Modulo } from "src/modulos/entities/modulo.entity";
import { Empresa } from "../../empresa/entities/empresa.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmpresaModulo {
     @PrimaryGeneratedColumn()
     id: number;

     @ManyToOne(() => Empresa, empresa => empresa.empresaModulo, { onDelete: 'CASCADE' })
     @JoinColumn({ name: 'empresa_id' })
     empresa: Empresa;

     @ManyToOne(() => Modulo, (modulo) => modulo.empresaModulo, { onDelete: 'CASCADE' })
     @JoinColumn({ name: 'modulo_id' })
     modulo: Modulo;

}

