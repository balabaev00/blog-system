import {User} from "./../user/entity/user.entity";
import {AuthGuard} from "./../auth/guards/auth.guard";
import {Controller, Get, Post, UseGuards} from "@nestjs/common";
import {UserDecorator} from "../user/decorators/user.decorator";
import {BlogService} from "./blog.service";

@Controller(`blog`)
export class BlogController {
	constructor(private blogService: BlogService) {}

	@Post(`create`)
	@UseGuards(AuthGuard)
	async test(@UserDecorator() user: User) {
		// const res = await this.blogService.create(dto);
	}
}
