import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  currentUser: string

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser()
  }

  logout(){
    this.authService.closeSession()
    this.router.navigate(['/login'])
  }

}
