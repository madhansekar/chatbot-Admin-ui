import { Component, OnInit } from '@angular/core';
import { faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import { DataServiceService } from '../services/data-service.service';
import {QuestionsService} from '../services/questions-service.service';
import { SubServiceLine } from '../models/sub-service-line';
import { Competency } from '../models/competency';
import { SubCompetency } from '../models/sub-competency';
import { Topics } from '../models/topic';
import { SubTopics } from '../models/sub-topics';
import {Question} from '../models/question';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationService } from '@progress/kendo-angular-notification';
import 'ag-grid-enterprise';




@Component({
  selector: 'app-interview-questions',
  templateUrl: './interview-questions.component.html',
  styleUrls: ['./interview-questions.component.css']
})
export class InterviewQuestionsComponent implements OnInit {
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






  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private dataService: DataServiceService, private notificationService: NotificationService, private questionService: QuestionsService) {
    this.userForm = this.formBuilder.group({
      subServiceLine: [null , [ Validators.required ]],
      competency:  [null , [ Validators.required ]],
      subCompetency: [null, [ Validators.required ]],
      topic:  [null, [ Validators.required ] ],
      subTopic:  [null, [ Validators.required ] ],

    });
    this.questions = [];
    this.rowData = [];


    this.columnDefs = [
      { field: '', width: 30, editable: false, headerCheckboxSelection: true, checkboxSelection: true, },
      {headerName: 'Question', field: 'question', editable: true},
      {headerName: 'Choice 1', field: 'choice1', editable: true},
      {headerName: 'Choice 2', field: 'choice2', editable: true},
      {headerName: 'Choice 3', field: 'choice3', editable: true},
      {headerName: 'Choice 4', field: 'choice4', editable: true},
      {headerName: 'Choice 5', field: 'choice5', editable: true},
      {headerName: 'Correct Answer', field: 'correctanswer', editable: true , cellEditor: 'agRichSelectCellEditor',
             cellEditorParams(params) {
               const list = [];
               if (params.data.choice1 && params.data.choice1 !== null && params.data.choice1 !== '') {
                 list.push(params.data.choice1);
               }
               if (params.data.choice2 && params.data.choice2 !== null && params.data.choice2 !== '') {
                 list.push(params.data.choice2);
               }
               if (params.data.choice3 && params.data.choice3 !== null && params.data.choice3 !== '') {
                 list.push(params.data.choice3);
               }
               if (params.data.choice4 && params.data.choice4 !== null && params.data.choice4 !== '') {
                 list.push(params.data.choice4);
               }
               if (params.data.choice5  && params.data.choice5 !== null && params.data.choice5 !== '') {
                 list.push(params.data.choice5);
               }


               return {
            values: list

          };
        }}



  ];
    this.columnDefs.singleClickEdit = true;

   }

  ngOnInit() {
    this.onLoad();

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
  onAdd() {

   const questionObj = new Question(this.userForm.controls.subTopic.value, this.questions.length + 1);

   this.questions.push(questionObj);
   this.loadGridData(this.questions);
   this.gridApi.setFocusedCell(this.questions.length - 1, 'question');
   this.gridApi.startEditingCell({
      rowIndex: this.questions.length - 1,
      colKey: 'question'
    });
    console.log('this.gridApi',this.gridApi)


  }
  onDelete() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (!selectedRows.length) {
      this.showWarning('Atleast one row must be selected to delete');
      return;
    }
    const idList = selectedRows.map((item) => item.tempid);
    this.questions = this.questions.filter((obj) => !idList.includes(obj.tempid));
    this.loadGridData(this.questions);

  }
  onSave() {
    this.questionService.saveQuestions(this.questions).subscribe(result => {
      this.showWarning('Questions Save Successfully');
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
      this.rowSelection = 'multiple';

    });
  }
 onChangeServiceLine(value) {

  this.listCompetencies = [];
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
    console.log("form",this.userForm)
  }
  onGridReset() {
    this.questions = [];
    this.loadGridData(this.questions);
  }
  onFormSubmit() {
    console.log('this.userForm', this.userForm.value);

  }
  isSaveDisbled() {return !this.questions.length ? true : this.validate(this.questions);}

  validate(question: Question[]) {
      const value = this.questions.find((obj) => this.isNullOrEmpty(obj.question) || this.isNullOrEmpty(obj.correctanswer));
      return value !== undefined;


  }
  isNullOrEmpty(value) {
return value === null || value === '' || value === undefined;
  }

}
