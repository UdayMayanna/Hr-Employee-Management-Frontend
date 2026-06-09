import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { HrServiceService } from '../../services/hr-service.service';

@Component({
  selector: 'app-dashboard',
  imports: [MenuComponent,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 constructor(){}
}
