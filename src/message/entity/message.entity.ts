import {User} from "../../user/entity/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import {Blog} from "../../blog/entity/blog.entity";

@Entity({name: `messages`})
export class Message {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	message: string;

	@CreateDateColumn({name: `created_at`})
	createdAt: Date;

	@ManyToOne(() => Blog, blog => blog.messages)
	@JoinColumn({name: `author_id`})
	author: User;
}
