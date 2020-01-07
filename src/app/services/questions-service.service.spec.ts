import { TestBed } from '@angular/core/testing';

import { QuestionsService } from './questions-service.service';

describe('QuestionsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionsService = TestBed.get(QuestionsService);
    expect(service).toBeTruthy();
  });
});
