import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity('User')
export class UserEntity {
    @PrimaryColumn({ length: 15 })
    id: string;

    @Column({ length: 30 })
    name: string;

    @Column({ unique: true, length: 50 })
    email: string;

    @Column({ length: 20 })
    password: string;
}
