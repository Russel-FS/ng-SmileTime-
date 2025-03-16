/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConversationCacheService } from './conversation-cache.service';

describe('Service: ConversationCache', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversationCacheService]
    });
  });

  it('should ...', inject([ConversationCacheService], (service: ConversationCacheService) => {
    expect(service).toBeTruthy();
  }));
});
