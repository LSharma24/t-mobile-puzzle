## Code smells:

1. Types are not defined in `reading-list.component.ts` and `book-search.component.ts`. This has been fixed by defining types which also helps to catch errors at the compile stage - thus resulting in less error-prone code. **(Fixed)**

2. In `book-search.component.ts` file, `getAllBooks` selector subscription may cause memory leak and performance issue as the subscription is never unsubscribed. Async pipe is now used to handle this which will auto unsubscribe once the component is destroyed. **(Fixed)**

3. `formatDate()`, being a method, will be called in each change detection run and hence an overhead in terms of performance. To avoid this we can use Date pipe. **(Fixed)**

4. `b`, which is not self explanatory naming convention, is used in `book-search.component.html` and `reading-list.component.html`. The same has been replaced with book. **(Fixed)**

5. State is not being reverted in case of add or remove book API failure. Test cases were also failing for reading-list reducer because `failedAddToReadingList` and `failedRemoveFromReadingList` were not implemented. **(Fixed)**

6. We already have *getter* method for `searchTerm` value so the same can be used in `searchBooks` method of `book-search.component.ts` file. **(Fixed)**

7. Incorrect describe text in `book-search.component.spec.ts` and `reading-list.reducer.spec.ts` files. **(Fixed)**

## Accessibility issues:

- ### Lighthouse testing issues:

    1. Buttons do not have an accessible name. **(Fixed by defining aria-label on search-icon button)**
        > When a button doesn't have an accessible name, screen readers and other assistive technologies announce it as button, which provides no information to users about what the button does.
    2. Background and foreground colors do not have a sufficient contrast ratio. **(Fixed by changing text color to `black` to increase contrast ratio)**
        > Text that has a low contrast ratio (whose brightness is too close to the background brightness) can be hard to read for many users.
- ### Manual testing issues:

    1. `Want to Read button` should also announce the title of a book. This makes easier for a user with special needs to understand which book he/she is going to add. **(Defined proper aria-label on button)**

    2. `Alt` is missing on `img` tag in `book-search.component.html` and `reading-list.component.html`. If an image is used simply for decoration, the `alt` attribute can be set to the empty string. **(Added `alt` on `img` tag)**

    3. Anchor tag is used for search example but there is no `href`. As per accessibility standards `a` tag should have a `href` with it. **(Changed it to `button` tag as we do not need to navigate from this)**

    4. Reading list close button is not read correctly by screen reader. **(Defined aria-label)**

## Improvements:

1. Error handling is not done for API failure scenarios. **(Implemented to show error message to user on search books API failure)**

2. Filters can be implemented to make search results more user-friendly. *For example: filtering books based on author name*

3. Spinner can be shown when search API is fetching results.

4. Route can be used for showing search results for the input provided so user can have a direct link to get search results for that input. *For example: http://localhost:4200/search?q=java*