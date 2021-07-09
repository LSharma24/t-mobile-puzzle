import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as ReadingListActions from './reading-list.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

@Injectable()
export class SnackBarEffects {
    confirmAddToReadingList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReadingListActions.confirmedAddToReadingList),
            tap(({ book, showSnackBar }) => {
                if (showSnackBar) {
                    this.showSnackBar(book, 'Book added to reading list.', true);
                }
            })
        ), { dispatch: false }
    );

    confirmRemoveFromReadingList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReadingListActions.confirmedRemoveFromReadingList),
            tap(({ item, showSnackBar }) => {
                if (showSnackBar) {
                    this.showSnackBar(item, 'Book removed from the list.', false);
                }
            })
        ), { dispatch: false }
    );

    constructor(private actions$: Actions, private matSnackBar: MatSnackBar, private store: Store) { }

    showSnackBar(item, message: string, isAdded: boolean) {
        this.matSnackBar
            .open(message, 'Undo', { duration: 5000 })
            .onAction()
            .subscribe(() => {
                if (isAdded) {
                    this.store.dispatch(ReadingListActions.removeFromReadingList({ item: { bookId: item.id, ...item }, showSnackBar: false }));
                } else {
                    this.store.dispatch(ReadingListActions.addToReadingList({ book: { id: item.bookId, ...item }, showSnackBar: false }));
                }
            });
    }
}
