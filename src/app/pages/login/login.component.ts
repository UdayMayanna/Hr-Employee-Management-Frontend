import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HrServiceService } from '../../services/hr-service.service';
import { Router, RouterLink } from '@angular/router';
import { userInfo } from 'os';
import { HttpClient } from '@angular/common/http';
import { Hr } from '../../models/Hr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  employeeLoginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(12)])
  })

  constructor(private hrservice: HrServiceService, private router: Router, private http: HttpClient) {
  }

  onLogin() {
    const email = this.employeeLoginForm.value.email;
    const pass = this.employeeLoginForm.value.password;
    this.hrservice.loginHr(email, pass).subscribe((result => {
      if(result){
        localStorage.setItem('loggedInHr',JSON.stringify(result))
        this.router.navigate(['/dashboard']);
      }
    })
    )
  }
}
