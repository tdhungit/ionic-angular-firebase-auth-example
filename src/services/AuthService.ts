import { Injectable } from '@angular/core';
import { Auth, signInWithPhoneNumber } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	confirmationResult: any;

	constructor(private fireAuth: Auth) {}

	public signInWithPhoneNumber(recaptchaVerifier: any, phoneNumber: string) {
		return new Promise<any>((resolve, reject) => {
			signInWithPhoneNumber(this.fireAuth, phoneNumber, recaptchaVerifier)
				.then((confirmationResult) => {
					this.confirmationResult = confirmationResult;
					resolve(confirmationResult);
				})
				.catch((error) => {
					console.log(error);
					reject('SMS not sent');
				});
		});
	}

	public async enterVerificationCode(code: string) {
		return new Promise<any>((resolve, reject) => {
			this.confirmationResult
				.confirm(code)
				.then(async (result: any) => {
					console.log(result);
					const user = result.user;
					resolve(user);
				})
				.catch((error: any) => {
					reject(error.message);
				});
		});
	}
}
