export class CreateBlogDto {
	name: string;
	message: string;
}

export class UpdateBlogDto {
	blogId: number;
	message: string;
}
