import { Component } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  imports: [FormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {

  loggedInHr : any;
  departments : any[] = [];
  index:number=0;
  constructor(private depService : DepartmentService){}

   isShowDepartmentForm:boolean=false;
   ngOnInit(){
     const hrData = JSON.parse(localStorage.getItem('loggedInHr')!);
     if(hrData){
      this.loggedInHr = hrData;
     }
     
     this.depService.getAllDepartments(this.loggedInHr.hrId).subscribe((result: any) => {
      this.departments = result;
    })
   }

   onAddDepartment(deptForm:any){
     this.depService.addDepartment(deptForm.value,this.loggedInHr.hrId).subscribe((res=>{
      if(res){
        alert("Department Added Successfully");
        this.ngOnInit();
      }
     }))
    console.log(deptForm)
   }
   onClickTogleForm(){
    this.isShowDepartmentForm = !this.isShowDepartmentForm;
   }
}
