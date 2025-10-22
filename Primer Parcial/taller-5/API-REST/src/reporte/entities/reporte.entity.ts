import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Reporte {
        @PrimaryGeneratedColumn('uuid')
        id_reporte: string;

    @Column()
    fecha_generacion: Date;

    @ManyToOne(() => User, (u) => u.reportes)
    admin: User;
}
