import {User} from "./../../user/entity/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity({name: `blogs`})
export class Blog {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	message: string;

	@CreateDateColumn({name: `created_at`})
	createdAt: Date;

	@ManyToOne(() => User, user => user.blogs)
	@JoinColumn({name: `author_id`})
	author: User;
}
