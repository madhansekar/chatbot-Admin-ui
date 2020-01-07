import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { InterviewQuestionsComponent } from './interview-questions/interview-questions.component';
import { InterviewPageComponent } from './interview-page/interview-page.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { ManualQuestionsComponent } from './manual-questions/manual-questions.component';
//import { Question2Component } from './question2/question2.component';
//import { Question3Component } from './question3/question3.component';


const routes: Routes = [
  { path:'admin', component:AdminComponent, pathMatch:'full'},
  { path:'login', component:LoginComponent, pathMatch:'full'},
  { path:'interview-questions', component:InterviewQuestionsComponent, pathMatch:'full'},
  { path:'interview-page', component:InterviewPageComponent, pathMatch:'full'},
  { path:'dashboard', component:DashboardComponent, pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

