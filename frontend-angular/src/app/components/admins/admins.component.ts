import { Component, OnInit } from '@angular/core';
import { DbServiceService } from 'src/app/services/db-service.service';
import { AdminHeader } from 'src/app/common/admin-header';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  adminHeaders: AdminHeader[];
  constructor(private dbService: DbServiceService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.listAdmins();
    //console.log(this.authService.getAdmins());
    // console.log(this.authService.isLoggedIn);
  }

  listAdmins(): void {
    this.dbService.getAdminList().subscribe(
      data => {
        this.adminHeaders = data;
      }
    );
  }

  isLoggedIn(): boolean {
    return this.authService.getIsLoggedIn();
  }

  redirect(): void {
    this.router.navigate(['login']);
  }

}
