import {DatabaseModule} from "./../database/database.module";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "./entity/message.entity";

@Module({
	imports: [DatabaseModule, TypeOrmModule.forFeature([Message])],
	providers: [],
	controllers: [],
	exports: [],
})
export class MessageModule {}
