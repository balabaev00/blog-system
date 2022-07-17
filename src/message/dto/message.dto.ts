import {ApiProperty} from "@nestjs/swagger";

export class CreateMessageDto {
	@ApiProperty({
		description: `Blog message`,
		example: `Today I've bought ...`,
	})
	message: string;
}

export class UpdateMessageDto {
	@ApiProperty({
		description: `Blog id`,
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: `Blog message`,
		example: `Today I've bought ...`,
	})
	message: string;
}
