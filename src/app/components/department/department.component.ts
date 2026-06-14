import { Component } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { FormsModule } from '@angular/forms';
import { department } from '../../models/departments';

@Component({
  selector: 'app-department',
  imports: [FormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {

  searchInput : string = '';

  loggedInHr : any;
  departments : department[] = [];
  index:number=0;
  isShowDepartmentForm:boolean=false;
  toUpdateDepartmentId:number=0;
  departmentToUpdate:string = "";

  constructor(private depService : DepartmentService){}

   ngOnInit(){
     const hrData = JSON.parse(localStorage.getItem('loggedInHr')!);
     if(hrData){
      this.loggedInHr = hrData;
     }
     
     this.depService.getAllDepartments(this.loggedInHr.hrId).subscribe((result : department[]) => {
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
    this.toUpdateDepartmentId = 0;
     this.departmentToUpdate = "";
    this.isShowDepartmentForm = !this.isShowDepartmentForm;
   }
   onDeleteDepartment(dept_id:number){
     this.depService.deleteDepartment(dept_id).subscribe((result:any)=>{
      if(result){
        alert(result.message);
        this.ngOnInit();
      }
     })
   }

   searchDepartment(){
    if(this.searchInput == ''){
      this.ngOnInit()
    }
      this.depService.serchDepartment(this.searchInput,this.loggedInHr.hrId).subscribe((result:any)=>{
        if(result){
          this.departments = result;
        }
      })
   }

   updateDepartmentForm(dept_id:number){
    this.isShowDepartmentForm = true;
    this.toUpdateDepartmentId=dept_id;
    this.depService.getSingleDepartment(dept_id).subscribe((result:department)=>{
      if(result){
             this.departmentToUpdate = result.departmentName;
      }
    })
   }

   updateDepartment(updatedDept:any,){
        this.depService.updateDepartment(updatedDept.value,this.toUpdateDepartmentId).subscribe((result:any)=>{
          if(result){
            alert(result.message);
            this.ngOnInit();
          }
        })
   }
}
