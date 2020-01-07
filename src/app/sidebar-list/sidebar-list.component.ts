import { Component, OnInit } from '@angular/core';
import { faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { faFileAlt} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {
  faQuestionCircle=faQuestionCircle;
  faUserCircle=faUserCircle;
  faFileAlt=faFileAlt;

  constructor() { }

  ngOnInit() {
  }

}
