import { TestBed } from '@angular/core/testing';

import { SubTopicService } from './sub-topic.service';

describe('SubTopicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubTopicService = TestBed.get(SubTopicService);
    expect(service).toBeTruthy();
  });
});
