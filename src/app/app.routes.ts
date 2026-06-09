import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OverviewComponent } from './components/overview/overview.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HrRegisterComponent } from './pages/hr-register/hr-register.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent,canActivate : [loginGuard]},
    { path: "dashboard", component: DashboardComponent,
        children: [
            { path: 'overview', component: OverviewComponent }, 
            { path: 'employee', component: EmployeeComponent },
            { path: 'department', component: DepartmentComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'add-employee', component: RegisterComponent },
            { path: 'update-employee', component: RegisterComponent },
            { path :'update-hr',component:HrRegisterComponent},
            { path: '', redirectTo: 'overview', pathMatch: 'full' }
        ],canActivate : [authGuard]
    },
    {path : 'hr-register',component:HrRegisterComponent,canActivate : [loginGuard]},
    {path: '',redirectTo: 'login', pathMatch: 'full'}
];
