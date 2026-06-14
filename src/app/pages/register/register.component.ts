import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HrServiceService } from '../../services/hr-service.service';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { employee } from '../../models/employee';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  employeeId: number = 0 ;

  employeeRegisterForm: FormGroup = new FormGroup({
    fname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email, Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.maxLength(10),
    Validators.minLength(10), Validators.pattern('^[0-9]{10}$')]),
    gender: new FormControl("", [Validators.required]),
    department: new FormControl("", [Validators.required]),
    role: new FormControl("", [Validators.required]),
    joiningDate: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required])
  })

  constructor(private empService: EmployeeService, private depSer: DepartmentService, private router: Router, private route: ActivatedRoute) { }

  loggedHr: any;
  departments: any[] = [];
  ngOnInit() {
    const data = localStorage.getItem("loggedInHr");
    if (data) {
      this.loggedHr = JSON.parse(data);
    }
    this.depSer.getAllDepartments(this.loggedHr.hrId).subscribe((result: any) => {
      this.departments = result;
    })

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const toUpdateId = Number(idParam);
      this.employeeId = toUpdateId;
      this.empService.getSingleEmployee(toUpdateId).subscribe((result: employee) => {
        if (result) {
          this.employeeRegisterForm.patchValue({
            fname: result.fname,
            email: result.email,
            phone: result.phone,
            gender: result.gender,
            department: result.department.departmentName,
            role: result.role,
            joiningDate: result.joiningDate,
            address: result.address
          });
        }
      });
    }
  }

  onAddEmployee() {

    const deptId = Number(this.employeeRegisterForm.value.department);

    const employeeData = {
      ...this.employeeRegisterForm.value
    };

    delete employeeData.department;

    this.empService
      .onAddEmployee(employeeData, deptId)
      .subscribe({
        next: (result) => {

          alert("Employee added successfully.");

          this.employeeRegisterForm.reset();

          this.router.navigate(['/dashboard/employee']);

        },

        error: (err) => {

          console.log(err);

          alert("Failed to add employee.");

        }
      });

  }
  onUpdateEmployee() {
    const employeeData = {
      ...this.employeeRegisterForm.value
    };
    const dept_id = employeeData.department;
    delete employeeData.department;
    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam){
      const toUpdateId = Number(idParam);
    this.empService.updateEmployee(toUpdateId,dept_id,employeeData).subscribe({
      next:(result)=>{
        alert("Employee details updated successfully.");
        this.employeeRegisterForm.reset();
        this.router.navigate(['/dashboard/employee']);
      },
      error:(err)=>{
        console.log(err);
        alert("Failed to update employee details.");
      }
    })  
  }
  }
}
