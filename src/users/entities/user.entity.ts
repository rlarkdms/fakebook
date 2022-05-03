import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity('User')
export class UserEntity {
    @PrimaryColumn()
    id: string;
    @Column({ length: 30 })
    name: string;
}
