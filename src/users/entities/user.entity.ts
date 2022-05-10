import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryColumn({ unique: true, length: 15 })
    id: string;

    @Column({ length: 30 })
    name: string;

    @Column({ length: 30 })
    email: string;

    @Column({ length: 60 })
    password: string;
}
