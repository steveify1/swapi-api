import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    movieEpisodeId: string;

    @Column({ type: 'varchar', length: 500 , nullable: false})
    body: string;

    @Column({ nullable: false })
    author: string;

    @Column({ type: 'datetime', nullable: false })
    createdAt: Date;

    @Column({ type: 'datetime', nullable: false })
    updatedAt: Date;
}
