import { Component, OnInit } from '@angular/core';
import { DbServiceService } from 'src/app/services/db-service.service';
import { Router } from '@angular/router';
import { Admin } from 'src/app/common/admin';

@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.css']
})
export class ListAdminsComponent implements OnInit {

  adminHeaders: Admin[];
  constructor(private dbService: DbServiceService, private router: Router) { }

  ngOnInit(): void {
    this.listAdmins();
  }

  listAdmins(): void {
    this.dbService.getAdminList().subscribe(
      data => {
        this.adminHeaders = data;
      }
    );
  }

  deleteAdmin(id: any): void {
    this.dbService.deleteAdmin(id).subscribe();
    alert("Admin deleted Successfully!")
    window.location.reload()
  }

  editAdmin(admin: Admin) {
    this.router.navigate(['/editAdmin',admin.id]​);
  }

}
