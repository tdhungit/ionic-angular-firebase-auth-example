import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, AuthRoutingModule],
	declarations: [LoginComponent],
})
export class AuthModule {}
