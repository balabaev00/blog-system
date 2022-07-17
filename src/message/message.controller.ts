import {User} from "./../user/entity/user.entity";
import {UserDecorator} from "./../user/decorators/user.decorator";
import {AuthGuard} from "./../auth/guards/auth.guard";
import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {MessageService} from "./message.service";
import {CreateMessageDto} from "./dto/message.dto";

@Controller(`message`)
@ApiTags(`message`)
export class MessageController {
	constructor(private messageService: MessageService) {}

	@Post(`create`)
	@UseGuards(AuthGuard)
	async create(@Body() dto: CreateMessageDto, @UserDecorator() user: User) {
		const res = await this.messageService.create(dto, user);
	}
}
