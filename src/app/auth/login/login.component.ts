import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import * as auth from 'firebase/auth';
import { AuthService } from 'src/services/AuthService';

@Component({
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
	phoneNumber: string = '+84972014011';
	authCode: string = '123456';
	hasCode: boolean = false;
	isLogin: boolean = false;

	recaptchaVerifier: any;

	accessToken: string = '';

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.recaptchaVerifier = new auth.RecaptchaVerifier(
			'recaptcha-container',
			{
				size: 'invisible',
				callback: (response: any) => {
					console.log(response);
				},
			},
			getAuth(),
		);
	}

	getCode() {
		if (!this.phoneNumber) {
			return;
		}
		this.authService.signInWithPhoneNumber(this.recaptchaVerifier, this.phoneNumber).then((res) => {
			this.hasCode = true;
		});
	}

	verifyCode() {
		if (!this.authCode) {
			return;
		}
		this.authService.enterVerificationCode(this.authCode).then((res: any) => {
			console.log(res);
			this.isLogin = true;
			this.accessToken = res.accessToken;
		});
	}
}
