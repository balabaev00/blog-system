import {BlogModule} from "./../blog/blog.module";
import {DatabaseModule} from "./../database/database.module";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "./entity/message.entity";
import {MessageService} from "./message.service";
import {MessageController} from "./message.controller";

@Module({
	imports: [DatabaseModule, BlogModule, TypeOrmModule.forFeature([Message])],
	providers: [MessageService],
	controllers: [MessageController],
	exports: [],
})
export class MessageModule {}
