import {Body, Controller, HttpException, Post, Res} from "@nestjs/common";
import {Response} from "express";
import {AuthService} from "./auth.service";
import {AuthDto, LoginDto} from "./dto/auth.dto";

@Controller(`auth`)
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post(`local/signUp`)
	async signUpLocal(@Body() dto: AuthDto, @Res({passthrough: true}) r: Response) {
		const result = await this.authService.signUpLocal(dto);

		if (result === `Email is busy`)
			return {
				error: true,
				status: 400,
				errorMessage: result,
			};

		return {
			error: false,
			status: 201,
			accessToken: result,
		};
	}

	@Post(`local/signIn`)
	async signInLocal(@Body() dto: LoginDto) {
		const resp = await this.authService.signInLocal(dto);

		if (resp instanceof HttpException) return resp;

		return {token: resp};
	}
}
