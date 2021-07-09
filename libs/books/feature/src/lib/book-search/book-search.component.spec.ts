import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getAllBooks } from '@tmo/books/data-access';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers: [
        provideMockStore({
          initialState: {
            books: {
              entities: []
            }
          },
          selectors: [{
            selector: getAllBooks,
            value: []
          }]
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('searchBooks action should be dispatched for input provided after 500ms', fakeAsync(() => {
    component.searchForm.controls.term.setValue('javascript');

    tick(400);

    expect(store.dispatch).not.toHaveBeenCalled();

    tick(100);

    expect(store.dispatch).toHaveBeenCalledWith({ term: 'javascript', type: '[Books Search Bar] Search' });
  }));

  it('clearSearch action should be dispatched when the input is empty', fakeAsync(() => {
    component.searchForm.controls.term.setValue('');

    tick(500);

    expect(store.dispatch).toHaveBeenCalledWith({ type: '[Books Search Bar] Clear Search' });
  }));

  it('should not dispatch multiple searchBooks action for same user input', fakeAsync(() => {
    component.searchForm.controls.term.setValue('java');

    tick(500);

    component.searchForm.controls.term.setValue('java');

    tick(500);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  }));

  it('should dispatch searchBooks action for different user input', fakeAsync(() => {
    component.searchForm.controls.term.setValue('java');

    tick(500);

    component.searchForm.controls.term.setValue('jav');

    tick(500);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
  }));

  it('should unsubscribe to observable stream when component is destroyed', fakeAsync(() => {
    component.ngOnDestroy();

    component.searchForm.controls.term.setValue('java');

    tick(500);

    expect(store.dispatch).not.toHaveBeenCalled();
  }));
});
