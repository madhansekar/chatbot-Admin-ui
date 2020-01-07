import { Component, OnInit } from '@angular/core';
import { faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import { DataServiceService } from '../services/data-service.service';
import {UserService} from '../services/user.service';
import { SubServiceLine } from '../models/sub-service-line';
import { Competency } from '../models/competency';
import { SubCompetency } from '../models/sub-competency';
import { Topics } from '../models/topic';
import { SubTopics } from '../models/sub-topics';
import {User} from '../models/user';
import {Levels}from '../models/levels';
import {Status}from '../models/status';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationService } from '@progress/kendo-angular-notification';
import 'ag-grid-enterprise';


@Component({
  selector: 'app-interview-page',
  templateUrl: './interview-page.component.html',
  styleUrls: ['./interview-page.component.css'],

})
export class InterviewPageComponent implements OnInit {

  faAngleDown = faAngleDown;
  faArrowCircleRight = faArrowCircleRight;
  faPlusSquare = faPlusSquare;
  serviceLines: SubServiceLine[];
  competencies: Competency[];
  subCompetencies: SubCompetency[];
  topics: Topics[];
  subTopics: SubTopics[];
  levels: Levels[];
  listCompetencies: Competency[];
  listSubCompetencies: SubCompetency[];
  listTopics: Topics[];
  listSubTopics: SubTopics[];
  listLevels: Levels[];
  listStatus:Status[];

  userForm: FormGroup;
   gridApi: any;
   gridColumnApi: any;
   gridOptionsApi: any;
  rowSelection: any;
  columnDefs: any;
  rowData: any;
  user: any;
  userData: User[];

  frameworkComponents: any;






  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private dataService: DataServiceService, private notificationService: NotificationService, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      subServiceLine: [null , [ ]],
      competency:  [null , [ ]],
      subCompetency: [null, [  ]],
      topic:  [null, [ ] ],
      subTopic:  [null, [ ] ],
      level: [null, []]

    });
    this.user  = {};
    this.userData = [];
    this.rowData = [];
   

    this.columnDefs = [
      { field: '', width: 30, editable: false, headerCheckboxSelection: true, checkboxSelection: true, },
      {headerName: 'User Id', field: 'id', editable: false},
      {headerName: 'Name', field: 'name', editable: false},
      {headerName: 'E-mail', field: 'email', editable: false},
      {headerName: 'Mobile', field: 'phoneNumber', editable: false},
      {headerName: 'Level', field: 'description', editable: false},
      {headerName: 'Score', field: 'score', editable: false},

      {headerName: 'Date', field: 'intwDate', editable: false},

      {headerName: 'Status', field: 'statusId', editable: true , cellEditor: 'agRichSelectCellEditor'}



  ];
    
    this.columnDefs.singleClickEdit = true;
 
   

   }
   
  ngOnInit() {
    this.onLoad();

  }
  loadColumn(){
    let refStatus = this.listStatus;
    let refList={}
    refStatus.forEach((x)=>{
      
      refList[x.statusId]=x.description
     

    })

    this.columnDefs = [
      { field: '', width: 30, editable: false, headerCheckboxSelection: true, checkboxSelection: true },
      {headerName: 'User Id', field: 'id', editable: false},
      {headerName: 'Name', field: 'name', editable: false},
      {headerName: 'E-mail', field: 'email', editable: false},
      {headerName: 'Mobile', field: 'phoneNumber', editable: false},
      {headerName: 'Level', field: 'description', editable: false},
      {headerName: 'Score', field: 'score', editable: false},

      {headerName: 'Date', field: 'intwDate', editable: false},

      {headerName: 'Status', field: 'statusId', editable: true , cellEditor: 'agRichSelectCellEditor',refData: refList,
             cellEditorParams: {values: Object.keys(refList) }}

  ];
    
    this.columnDefs.singleClickEdit = true;
    this.gridApi.setColumnDefs(this.columnDefs)
  }
  public showWarning(msg): void {
    this.notificationService.show({
        content: msg,
        cssClass: 'button-notification',
        animation: { type: 'slide', duration: 200 },
        position: { horizontal: 'center', vertical: 'top' },
        type: { style: 'warning', icon: true },

    });
}
onSearch() {

  this.user = new User(this.userForm.controls.subServiceLine.value, this.userForm.controls.competency.value, this.userForm.controls.subCompetency.value, this.userForm.controls.topic.value, this.userForm.controls.subTopic.value, this.userForm.controls.level.value);
  this.userService.searchUsers(this.user).subscribe(result => {
      this.showWarning('Users Retrieved Successfully');
      this.onGridReset();
      this.userData = result.data.Users;
      this.loadGridData(this.userData);

    }, error => {
      this.showWarning('Users were not Retrieved successfully,Unexpected error at server end');

    });

  }
  onLoad() {
    this.dataService.getAll().subscribe(result => {
      this.serviceLines = result.data.subserviceLines;
      this.competencies = result.data.competencies;
      this.subCompetencies = result.data.subCompetencies;
      this.topics = result.data.topics;
      this.subTopics = result.data.subTopics;
      this.listLevels = result.data.levels;
      this.listStatus=result.data.status;
      this.rowSelection = 'multiple';
      this.loadColumn();
      

    });
  }
 onChangeServiceLine(value) {

  this.listCompetencies = [];
  this.listSubCompetencies = [];
  this.listTopics = [];
  this.listSubTopics = [];


  this.userForm.controls.level.setValue(null);
  this.userForm.controls.competency.setValue(null);
  this.userForm.controls.subCompetency.setValue(null);
  this.userForm.controls.topic.setValue(null);
  this.userForm.controls.subTopic.setValue(null);

  this.onGridReset();
  this.loadCompetency(value.subServicelineId);


 }
loadCompetency(lineId) {

  this.listCompetencies = this.competencies.filter(x => x.subServicelineId === lineId);

 }

 onChangeCompetency(value) {
  this.listSubCompetencies = [];
  this.listTopics = [];
  this.listSubTopics = [];


  this.userForm.controls.level.setValue(null);
  this.userForm.controls.subCompetency.setValue(null);
  this.userForm.controls.topic.setValue(null);
  this.userForm.controls.subTopic.setValue(null);
  this.onGridReset();
  if (value !== undefined) {
  this.loadSubCompetency(value.competencyId);
  }


 }

 loadSubCompetency(Id) {
  this.listSubCompetencies = this.subCompetencies.filter(x => x.competencyId === Id);

 }

 onChangeSubCompetency(value) {
  this.listTopics = [];
  this.listSubTopics = [];


  this.userForm.controls.level.setValue(null);
  this.userForm.controls.topic.setValue(null);
  this.userForm.controls.subTopic.setValue(null);
  this.onGridReset();
  if (value !== undefined) {
  this.loadTopics(value.subCompetencyId);
  }

 }
 onGridReady(params) {
    if (params != null) {
      this.gridApi = params.api;

      this.gridColumnApi = params.columnApi;
      

    }
  }
  loadGridData(data: any) {
    this.gridApi.setRowData(data);
  }
  loadTopics(id) {
    this.listTopics = this.topics.filter(x => x.subCompetencyId === id);
    this.onGridReset();

  }
  onChangeTopic(value) {
    this.listSubTopics = [];


    this.userForm.controls.level.setValue(null);
    this.onGridReset();

    this.userForm.controls.subTopic.setValue(null);
    if (value !== undefined) {
      this.loadSubTopics(value.topicId);
    }
  }
  loadSubTopics(id) {
    this.listSubTopics = this.subTopics.filter(x => x.topicId === id);

  }
  onChangeSubTopic(value) {
    this.onGridReset();


    this.userForm.controls.level.setValue(null);
  }
  onChangeLevel(value) {


  }
  onGridReset() {
    this.userData = [];
    this.loadGridData(this.userData);
  }
  onFormSubmit() {


  }
  isSaveDisbled() {return false; }


  isNullOrEmpty(value) {
return value === null || value === '' || value === undefined;
  }


}
