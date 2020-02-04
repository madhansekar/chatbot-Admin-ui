import {SubTopics} from './sub-topics';
import{Levels} from './levels'

export class Question {
               tempid:number;
         question:string;
          choice1:string;
      	  choice2:string;
      	  choice3:string;
      	  choice4: string;
      	  choice5: string;
      	  correctanswer: string;
	       isactive: boolean;
           rmtCompetencySubTopics: SubTopics;
           level:Levels;
            constructor(subTopic: SubTopics, id: number) {

                this.tempid = id;
                this.rmtCompetencySubTopics = subTopic;
                this.question = null;
                this.choice1 = null;
                this.choice2 = null;
                this.choice3 = null;
                this.choice4 = null;
                this.choice4 = null,
        this.correctanswer = null;
                this.isactive = true;
                this.level=new Levels();
    }
}
