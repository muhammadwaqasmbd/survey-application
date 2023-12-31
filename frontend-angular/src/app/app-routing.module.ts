import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSurveyComponent } from './components/user-survey/user-survey.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { TakeSurveyComponent } from './components/take-survey/take-survey.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { SurveyDetailsComponent } from './components/survey-details/survey-details.component';
import { AdminsComponent } from './components/admins/admins.component';


const routes: Routes = [
  { path: 'surveyDetails/:id', component: SurveyDetailsComponent},
  { path: 'addAdmin', component: AddAdminComponent},
  { path: 'editAdmin/:id', component: AddAdminComponent},
  { path: 'createSurvey', component: CreateSurveyComponent }, 
  { path: 'takeSurvey/:id', component:  TakeSurveyComponent},
  { path: 'login', component: AdminLoginComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'admins', component: AdminsComponent },
  { path: 'surveycompleted', component: UserSurveyComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
