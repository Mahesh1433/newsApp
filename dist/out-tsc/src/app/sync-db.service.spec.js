import { TestBed } from '@angular/core/testing';
import { SyncDbService } from './sync-db.service';
describe('SyncDbService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(SyncDbService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=sync-db.service.spec.js.map