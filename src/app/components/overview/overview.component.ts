import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { dashboardStats } from '../../models/dashboard-stats';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
   dashboardStat! : dashboardStats;
   constructor(private empSer : EmployeeService){}

   ngOnInit(){
    const hrId = JSON.parse(localStorage.getItem('loggedInHr')!).hrId;

     this.empSer.getDashboardCount(hrId).subscribe((result:dashboardStats)=>{
      if(result){
        this.dashboardStat = result;
      }
     })
   }
}
