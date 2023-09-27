import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Admin } from 'src/app/common/admin';
import { DbServiceService } from 'src/app/services/db-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  newAdmin: Admin = new Admin();
  adminAdded: boolean = false;
  adminId = null;
  buttonName: String = "Save";

  constructor(private dbService: DbServiceService, private router: Router, private authService: AuthService,
    private route:ActivatedRoute) { 
      this.adminId = route.snapshot.params["id"]
    }

  ngOnInit(): void {
    if(this.adminId){
      this.dbService.getAdmin(this.adminId).subscribe(
        data => {
          this.buttonName = "Update"
          this.newAdmin.initializeExisting(data);
        }
      )
    }else{
      this.newAdmin.initialize();
    }
  }

  addAdmin(f: any) {
    this.dbService.addAdmin(this.newAdmin).subscribe(
      data => {
        this.router.navigate(['/admins']​);
      }
    )
  }

  isLoggedIn(): boolean {
    return this.authService.getIsLoggedIn();
  }

  redirect(): void {
    this.router.navigate(['login']);
  }

}
