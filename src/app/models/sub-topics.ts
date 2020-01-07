import {Topics} from './topic';
export class SubTopics {
  tempid:number;
  subTopicId: number;
  topicId: number;
  subTopicName: string;
  isactive: boolean;
  rmtCompetencyTopics:Topics;
  constructor(topic: Topics, id: number) {
    this.tempid = id;
    this.rmtCompetencyTopics = topic;
    this.subTopicName = null;
    this.isactive = true;

}

}
