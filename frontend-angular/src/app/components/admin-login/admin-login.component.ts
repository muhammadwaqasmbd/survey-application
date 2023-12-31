import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Admin } from 'src/app/common/admin';
import { DbServiceService } from 'src/app/services/db-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private dbService: DbServiceService, private router: Router, private authService: AuthService) { }

  errorMsg: string = "";
  loginForm: FormGroup;
  admin: Admin = new Admin();

  ngOnInit(): void {
    // if user is already logged in, then redirect to admin home page
    if (this.authService.getIsLoggedIn()) {
      this.router.navigate(['admin']);
    }
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  login(): void {
    let admn = new Admin();
    admn.email = this.loginForm.value.email;
    admn.password = this.loginForm.value.password;

    this.dbService.verifyLogin(admn).subscribe(
      data => {
        if(data.accessToken === "Error"){
          this.errorMsg = "Invalid User name or password";
        }else{
          localStorage.setItem("token",data.accessToken);
          if (data.id != -1) {
            let newAdmin = new Admin();
            newAdmin.email = data.email;
            newAdmin.firstName = data.firstName;
            newAdmin.lastName = data.lastName;
            newAdmin.id = data.id;
            newAdmin.isPrimaryAdmin = data.isPrimaryAdmin;
            this.admin = newAdmin;
            this.errorMsg = "";
            this.authService.login(newAdmin);
            window.location.replace("/admin")
          } else {
            this.errorMsg = "Invalid User name or password";
          }
        }
        // console.log(this.admin);
      }
    );
  }


}
