import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedTestingModule, createBook, createReadingListItem, MatSnackBarMock } from '@tmo/shared/testing';
import * as ReadingListActions from './reading-list.actions';
import { SnackBarEffects } from './snack-bar.effects';

describe('ToReadEffects', () => {
    let actions: ReplaySubject<any>;
    let effects: SnackBarEffects;
    let snackBarService: MatSnackBar;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedTestingModule, MatSnackBarModule],
            providers: [
                SnackBarEffects,
                provideMockActions(() => actions),
                provideMockStore(),
                {
                    provide: MatSnackBar, useClass: MatSnackBarMock
                }
            ]
        });
        effects = TestBed.inject(SnackBarEffects);
        snackBarService = TestBed.inject(MatSnackBar);
    });

    describe('confirmAddToReadingList$', () => {
        it('should open the snack bar when confirmedAddToReadingList action is dispatched', done => {
            actions = new ReplaySubject();
            spyOn(snackBarService, 'open').and.callThrough();
            actions.next(ReadingListActions.confirmedAddToReadingList({ book: createBook('A'), showSnackBar: true }));

            effects.confirmAddToReadingList$.subscribe(() => {
                expect(snackBarService.open).toHaveBeenCalledWith("Book added to reading list.", "Undo", { "duration": 5000 });
                done();
            });
        });
    });

    describe('confirmRemoveFromReadingList$', () => {
        it('should open the snack bar when confirmedRemoveFromReadingList action is dispatched', done => {
            actions = new ReplaySubject();
            spyOn(snackBarService, 'open').and.callThrough();
            actions.next(ReadingListActions.confirmedRemoveFromReadingList({ item: createReadingListItem('A'), showSnackBar: true }));

            effects.confirmRemoveFromReadingList$.subscribe(() => {
                expect(snackBarService.open).toHaveBeenCalledWith("Book removed from the list.", "Undo", { "duration": 5000 });
                done();
            });
        });
    });
});
