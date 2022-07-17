export interface AccessTokenPayload {
	userId: number;
	email: string;
}

export interface BlogResponse {
	id: number;
	name: string;
	createdAt: Date;
	authorId: number;
}
