import {SubServiceLine} from './sub-service-line';
import {Competency} from './competency';


import {SubCompetency} from './sub-competency';
import {Topics} from './topic';
import {SubTopics} from './sub-topics';
import { Levels } from './levels';

export class User {
  id: number;
  subServicelineId: number;
  subServicelineName: string;
  competencyId: number;
  competencyName: string;
  subCompetencyId: number;
  subCompetencyName: string;
  topicId: number;
  topicName: string;
  subTopicId: number;
  subTopicName: string;
  levelId: number;
  description: string;
  name: string;
  email: string;
  score: number;
  phoneNumber: string;
  intwDate: string;
  isactive: boolean;
  statusId:number;

  constructor(line: SubServiceLine, comp: Competency, subComp: SubCompetency, topics: Topics, subtopic: SubTopics, level: Levels) {
this.subServicelineId = line? line.subServicelineId:null;
this.competencyId = comp?comp.competencyId:null;
this.subCompetencyId = subComp?subComp.subCompetencyId:null;
this.topicId = topics?topics.topicId:null;
this.subTopicId = subtopic?subtopic.subTopicId:null;
this.levelId = level?level.levelId:null;


}
}
