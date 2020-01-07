import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InterviewQuestionsComponent } from './interview-questions/interview-questions.component';
import { AdminComponent } from './admin/admin.component';
import { InterviewPageComponent } from './interview-page/interview-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SidebarListComponent } from './sidebar-list/sidebar-list.component';
import { HeaderComponent } from './header/header.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule   } from '@angular/forms';
//import { ManualQuestionsComponent } from './manual-questions/manual-questions.component';
//import { Question2Component } from './question2/question2.component';
//import { Question3Component } from './question3/question3.component';
import { DataServiceService } from './services/data-service.service';
import { QuestionsService } from './services/questions-service.service';
import {TopicService} from './services/topic.service';
import {UserService} from './services/user.service';
import {SubTopicService} from './services/sub-topic.service';
import { AgGridModule } from 'ag-grid-angular';
import {CurrencyRenderer} from './editorcomponents/testRenderer'
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { LayoutModule } from '@progress/kendo-angular-layout';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InterviewQuestionsComponent,
    AdminComponent,
    InterviewPageComponent,
    DashboardComponent,
    SidebarListComponent,
    HeaderComponent,


    CurrencyRenderer
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabsModule.forRoot(),
    FontAwesomeModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    Ng2SmartTableModule,
    ReactiveFormsModule ,
    AgGridModule.withComponents([CurrencyRenderer]),
    HttpClientModule,
    DropDownsModule,
    NotificationModule,
    LayoutModule

      ],
  providers: [DataServiceService,QuestionsService,TopicService,SubTopicService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
