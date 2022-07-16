import {User} from "./../user/entity/user.entity";
import {AuthGuard} from "./../auth/guards/auth.guard";
import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {UserDecorator} from "../user/decorators/user.decorator";
import {BlogService} from "./blog.service";
import {CreateBlogDto, UpdateBlogDto} from "./dto/blog.dto";

@Controller(`blog`)
export class BlogController {
	constructor(private blogService: BlogService) {}

	@Post(`create`)
	@UseGuards(AuthGuard)
	async create(@Body() dto: CreateBlogDto, @UserDecorator() user: User) {
		const res = await this.blogService.create(dto, user);

		return res;
	}

	@Put(`update`)
	@UseGuards(AuthGuard)
	async update(@Body() dto: UpdateBlogDto, @UserDecorator(`userId`) userId: number) {
		const res = await this.blogService.update(dto, userId);

		return res;
	}

	@Get(``)
	async getAll() {
		const res = await this.blogService.findAll();

		return res;
	}

	@Get(`:userId`)
	async getByUserId(@Param(`userId`) userId: number) {
		const res = await this.blogService.findByUserId(userId);

		return res;
	}

	@Delete(`:blogId`)
	async delete(
		@Param(`blogId`) blogId: number,
		@UserDecorator(`userId`) userId: number
	) {
		const res = await this.blogService.delete(blogId, userId);

		return res;
	}
}
