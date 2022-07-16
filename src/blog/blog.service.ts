import {User} from "./../user/entity/user.entity";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CreateBlogDto, UpdateBlogDto} from "./dto/blog.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Blog} from "./entity/blog.entity";
import {Repository} from "typeorm";

@Injectable()
export class BlogService {
	constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) {}

	/**
	 * It creates a new blog, sets the message, name, and author, and then saves it to the database
	 * @param {CreateBlogDto} dto - CreateBlogDto - This is the DTO that we created earlier.
	 * @param {User} user - User - This is the user that is currently logged in.
	 * @returns The blog that was created.
	 */
	async create(dto: CreateBlogDto, user: User) {
		const newBlog = new Blog();

		newBlog.message = dto.message;
		newBlog.name = dto.name;
		newBlog.author = user;

		return await this.blogRepository.save(newBlog);
	}

	/**
	 * It takes a blog id and a user id, finds the blog, checks if the user is the author of the blog, and
	 * if so, updates the blog
	 * @param {UpdateBlogDto} dto - UpdateBlogDto - this is the data transfer object that we will use to
	 * update the blog.
	 * @param {number} userId - The id of the user who is making the request.
	 * @returns The updated blog
	 */
	async update(dto: UpdateBlogDto, userId: number) {
		const oldBlog = await this.findAndCheck(dto.blogId, userId);

		if (oldBlog instanceof HttpException) return oldBlog;

		oldBlog.message = dto.message;
		return await this.blogRepository.save(oldBlog);
	}

	/**
	 * It finds a blog by its id and checks if the user is the owner of the blog
	 * @param {number} blogId - The id of the blog we want to update.
	 * @param {number} userId - The id of the user who is trying to update the blog.
	 * @returns Blog or HttpException
	 */
	async findAndCheck(blogId: number, userId: number) {
		const oldBlog = await this.blogRepository.findOne({id: blogId});

		if (!oldBlog) return new HttpException(`Blog not found`, HttpStatus.BAD_REQUEST);
		if (oldBlog.author.id !== userId)
			return new HttpException(
				`You are not owner this blog`,
				HttpStatus.BAD_REQUEST
			);

		return oldBlog;
	}

	/**
	 * It returns a promise that resolves to an array of blog posts
	 * @returns An array of all the blogs in the database.
	 */
	async findAll() {
		return await this.blogRepository.find();
	}

	/**
	 * It return a promise that resolves to an array of blog posts for userId
	 * @param {number} userId - number - The user ID of the user whose blogs we want to find.
	 * @returns An array of Blogs
	 */
	async findByUserId(userId: number) {
		const blogs = await this.blogRepository
			.createQueryBuilder(`blog`)
			.leftJoinAndSelect(`blog.author`, `user`)
			.where(`blog.author_id = :userID`, {userId: userId})
			.getMany();
		return blogs;
	}

	async delete(blogId: number, userId: number) {
		const blog = await this.findAndCheck(blogId, userId);

		if (blog instanceof HttpException) return blog;

		return await this.blogRepository.delete(blog);
	}
}
