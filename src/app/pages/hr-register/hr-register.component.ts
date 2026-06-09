import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HrServiceService } from '../../services/hr-service.service';
import { Hr } from '../../models/Hr';

@Component({
  selector: 'app-hr-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './hr-register.component.html',
  styleUrl: './hr-register.component.css'
})
export class HrRegisterComponent {
  hrRegisterForm: FormGroup = new FormGroup({
    fname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
    phone: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]),
    gender: new FormControl("", [Validators.required])
  })

  constructor(private hrservice: HrServiceService, private router: Router) {
  }
  hrData: any;
  ngOnInit() {
    this.hrData = history.state.loggedHr;
    if (this.hrData) {
      this.hrRegisterForm.patchValue({
        fname: this.hrData.fname,
        email: this.hrData.email,
        password: this.hrData.password,
        gender: this.hrData.gender,
        phone: this.hrData.phone
      })
    }
  }
  onRegister() {
    this.hrservice.registerHR(this.hrRegisterForm.value as Hr).subscribe((result) => {
      this.router.navigate(['/login']);
      this.hrRegisterForm.reset();
    })
  }
  onUpdate() {
    this.hrservice.updateHr(this.hrRegisterForm.value as Hr,this.hrData.hrId).subscribe((result)=>{
      if(result){
      localStorage.setItem('loggedInHr',JSON.stringify(result))
      this.router.navigate(['/dashboard/profile']);
      }
    })
  }
}
