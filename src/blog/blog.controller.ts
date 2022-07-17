import {User} from "./../user/entity/user.entity";
import {AuthGuard} from "./../auth/guards/auth.guard";
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	Post,
	Put,
	UseGuards,
} from "@nestjs/common";
import {UserDecorator} from "../user/decorators/user.decorator";
import {BlogService} from "./blog.service";
import {
	CreateBlogDto,
	CreateBlogReturn201,
	CreateBlogReturn400,
	DeleteBlogReturn204,
	DeleteBlogReturn400,
	GetBlogByUserIdReturn200,
	GetBlogsReturn200,
	UpdateBlogDto,
	UpdateBlogReturn204,
	UpdateBlogReturn400,
} from "./dto/blog.dto";
import {ApiCookieAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Blog} from "./entity/blog.entity";

@Controller(`blog`)
@ApiTags(`blog`)
export class BlogController {
	constructor(private blogService: BlogService) {}

	@Post(`create`)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 201,
		description: `OK`,
		type: CreateBlogReturn201,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: CreateBlogReturn400,
	})
	@ApiCookieAuth(`jwt`)
	async create(@Body() dto: CreateBlogDto, @UserDecorator() user: User) {
		const res = await this.blogService.create(dto, user);

		if (res instanceof Blog === false)
			return {
				error: true,
				status: 400,
				errorMessage: `Something was wrong`,
			};

		return {
			error: false,
			status: 201,
			blog: res,
		};
	}

	@Put(`update`)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 204,
		description: `OK`,
		type: UpdateBlogReturn204,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: UpdateBlogReturn400,
	})
	@ApiCookieAuth(`jwt`)
	async update(@Body() dto: UpdateBlogDto, @UserDecorator(`userId`) userId: number) {
		const res = await this.blogService.update(dto, userId);

		if (res instanceof HttpException)
			return {
				error: true,
				status: 400,
				errorMessage: `Something was wrong`,
			};

		return {
			error: false,
			status: 204,
			blog: res,
		};
	}

	@Get(``)
	@ApiResponse({
		status: 200,
		description: `Blogs array`,
		type: GetBlogsReturn200,
	})
	async getAll() {
		const res = await this.blogService.findAll();

		return {
			error: false,
			status: 200,
			blogs: res,
		};
	}

	@Get(`:userId`)
	@ApiResponse({
		status: 200,
		description: `Blogs array`,
		type: GetBlogByUserIdReturn200,
	})
	async getByUserId(@Param(`userId`) userId: number) {
		const res = await this.blogService.findByUserId(userId);

		return {
			error: false,
			status: 200,
			blogs: res,
		};
	}

	@Delete(`:blogId`)
	@UseGuards(AuthGuard)
	@ApiResponse({
		status: 204,
		description: `Blog was deleted`,
		type: DeleteBlogReturn204,
	})
	@ApiResponse({
		status: 400,
		description: `Something is wrong`,
		type: DeleteBlogReturn400,
	})
	@ApiCookieAuth(`jwt`)
	async delete(
		@Param(`blogId`) blogId: number,
		@UserDecorator(`userId`) userId: number
	) {
		const res = await this.blogService.delete(blogId, userId);

		if (res instanceof HttpException)
			return {
				error: true,
				status: 400,
				errorMessage: `Something was wrong`,
			};

		return {
			error: false,
			status: 204,
			message: `Blog was deleted`,
		};
	}
}
