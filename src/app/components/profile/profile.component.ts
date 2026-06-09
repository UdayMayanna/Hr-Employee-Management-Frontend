import { Component, OnInit } from '@angular/core';
import { Hr } from '../../models/Hr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  loggedHr : any;

  constructor(private router : Router){} 

  ngOnInit(){
    const data = localStorage.getItem('loggedInHr');
    if(data){
        this.loggedHr = JSON.parse(data);
    }
   }
   onLogout(){
      localStorage.removeItem('loggedInHr');
      this.router.navigate(['/login'])
   }
   onEditHR(loggedHr:any){
    this.router.navigate(['/dashboard/update-hr'],{
      state : {loggedHr}
    })
   }
}
