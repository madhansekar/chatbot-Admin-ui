import {SubCompetency} from './sub-competency';
export class Topics  {
  topicId: number;
  topicName: string;
  isactive: boolean;
  tempid: number;
  subCompetencyId:number;
  rmtSubCompetency: SubCompetency;

  constructor(subComp: SubCompetency, id: number) {

    this.tempid = id;
    this.rmtSubCompetency = subComp;
    this.topicName = null;
    this.isactive = true;

}


}
