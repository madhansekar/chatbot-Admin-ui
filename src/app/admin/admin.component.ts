import { Component, OnInit } from '@angular/core';
import { faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import { DataServiceService } from '../services/data-service.service';
import {TopicService} from '../services/topic.service';
import {SubTopicService} from '../services/sub-topic.service';
import { SubServiceLine } from '../models/sub-service-line';
import { Competency } from '../models/competency';
import { SubCompetency } from '../models/sub-competency';
import { Topics} from '../models/topic';
import { SubTopics } from '../models/sub-topics';
import {Question} from '../models/question';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationService } from '@progress/kendo-angular-notification';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {



  faAngleDown = faAngleDown;
  faArrowCircleRight = faArrowCircleRight;
  faPlusSquare = faPlusSquare;
  serviceLines: SubServiceLine[];
  competencies: Competency[];
  subCompetencies: SubCompetency[];
  topics: Topics[];
  subTopics: SubTopics[];
  listCompetencies: Competency[];
  listSubCompetencies: SubCompetency[];
  listTopics: Topics[];
  listSubTopics: SubTopics[];
  userForm: FormGroup;
   gridApi: any;
   gridColumnApi: any;
   gridOptionsApi: any;
  rowSelection: any;
  columnDefs: any;
  rowData: any;
  questions: Question[];
  frameworkComponents: any;
  modalList:any;







  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private dataService: DataServiceService, private notificationService: NotificationService,private topicService:TopicService,private subTopicService:SubTopicService) {
    this.userForm = this.formBuilder.group({
      subServiceLine: [null , [ Validators.required ]],
      competency:  [null , [ Validators.required ]],
      subCompetency: [null, [ Validators.required ]],
      topic:  [null],
      subTopic:  [null],

    });
    this.questions = [];
    this.rowData = [];
    this.columnDefs = []
    this.rowSelection = 'multiple';
   }

  ngOnInit() {
    this.onLoad();
    this.initializeTopicTab();

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
onAddTopic() {

  const modelObj = new Topics(this.userForm.controls.subCompetency.value, this.modalList.length + 1);

  this.modalList.push(modelObj);
  this.loadGridData(this.modalList);
   this.gridApi.startEditingCell({
      rowIndex: this.modalList.length - 1,
      colKey: 'topicName'
    });



 }
 onDelete() {
  const selectedRows = this.gridApi.getSelectedRows();
  if (!selectedRows.length) {
    this.showWarning('Atleast one row must be selected to delete');
    return;
  }
  const idList = selectedRows.map((item) => item.tempid);
  this.modalList = this.modalList.filter((obj) => !idList.includes(obj.tempid));
  this.loadGridData(this.modalList);

}
onAddSubTopic() {

   const modelObj = new SubTopics(this.userForm.controls.topic.value, this.modalList.length + 1);

   this.modalList.push(modelObj);
  this.loadGridData(this.modalList);

   this.gridApi.startEditingCell({
      rowIndex: this.modalList.length - 1,
      colKey: 'subTopicName'
    });


  }

  onSaveTopic() {

    this.topicService.saveTopics(this.modalList).subscribe(result => {
      this.showWarning('Topics Save Successfully');
      this.onGridReset();

    }, error => {
      this.showWarning('Questions were not saved,Unexpected error at server end');

    });

  }
  onSaveSubTopic() {

    this.subTopicService.saveSubTopics(this.modalList).subscribe(result => {
      this.showWarning('Sub Topics Save Successfully');
      this.onGridReset();

    }, error => {
      this.showWarning('Questions were not saved,Unexpected error at server end');

    });

  }
  onLoad() {
    this.dataService.getAll().subscribe(result => {
      this.serviceLines = result.data.subserviceLines;
      this.competencies = result.data.competencies;
      this.subCompetencies = result.data.subCompetencies;
      this.topics = result.data.topics;
      this.subTopics = result.data.subTopics;


    });
  }
 onChangeServiceLine(value) {

  this.listCompetencies =      [];
  this.listSubCompetencies = [];
  this.listTopics = [];
  this.listSubTopics = [];

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
    this.onGridReset();
  }
  loadSubTopics(id) {
    this.listSubTopics = this.subTopics.filter(x => x.topicId === id);

  }
  onChangeSubTopic(value) {
    this.onGridReset();

  }
  onGridReset() {
    this.modalList = [];
    this.loadGridData(this.modalList);
  }
  onFormSubmit() {
    console.log('this.userForm', this.userForm.value);

  }


  validateTopic() {
    return !this.modalList.length?true :
       this.modalList.find((obj) =>          this.isNullOrEmpty(obj.topicName))!==undefined;



  }
  validateSubTopic() {
    return !this.modalList.length?true :
      this.modalList.find((obj) => this.isNullOrEmpty(obj.subTopicName))!==undefined;




}
  isNullOrEmpty(value) {
return value === null || value === '' || value === undefined;
  }
  initializeTopicTab(){
    this.userForm.controls.topic.setValidators([]);
    this.userForm.controls.subServiceLine.setValue(null);
    this.userForm.controls.competency.setValue(null);
    this.userForm.controls.subCompetency.setValue(null);
    this.listCompetencies = [];
  this.listSubCompetencies = [];

    this.columnDefs = [
      { field: '', width:30, editable: false, headerCheckboxSelection: true, checkboxSelection: true, suppressSizeToFit: true},
      {headerName: '#',width:100, field: 'tempid', editable: false},
      {headerName: 'Topic Name',width:475, field: 'topicName', editable: true}
      ];
    this.columnDefs.singleClickEdit = true;

    this.modalList=[];
    this.gridApi.setColumnDefs( this.columnDefs)
    this.gridApi.sizeColumnsToFit();

  }
  initializeSubTopicTab(){
    this.userForm.controls.topic.setValidators([Validators.required]);
    this.userForm.controls.subServiceLine.setValue(null);
    this.userForm.controls.competency.setValue(null);
    this.userForm.controls.subCompetency.setValue(null);
    this.userForm.controls.topic.setValue(null);
    this.listCompetencies = [];
  this.listSubCompetencies = [];
  this.listTopics = [];
    this.columnDefs = [
      { field: '', width: 40, editable: false, headerCheckboxSelection: true, checkboxSelection: true, },
      {headerName: '#', field: 'tempid', editable: false},
      {headerName: 'Sub TopicName',width:475, field: 'subTopicName', editable: true},
      ];
    this.columnDefs.singleClickEdit = true;


    this.modalList=[];
    this.gridApi.setColumnDefs( this.columnDefs)
    console.log('this.columnDefs')

  }
  onTabSelect(e){
    this.onLoad();
    if(e.title=="Add Topic"){
     this.initializeTopicTab();


    }else{
      this.initializeSubTopicTab();
    }

  }

}
