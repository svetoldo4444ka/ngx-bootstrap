import { Component } from '@angular/core';

@Component({
  selector: 'demo-pagination-accessible',
  templateUrl: './pagination-accessible.html'
})
export class DemoPaginationAccessibleComponent {
  params: object = {
    navText: 'Navigation example',
    accessibleLinks: true,
    boundaryAccessibleLinks: true,
    previousAccessibleText: '&larr;',
    nextAccessibleText: '&rarr;',
    lastAccessibleText: '&rArr;',
    firstAccessibleText: '&lArr;',
    nextLabelText: 'it\'s text for label in next btn',
    previousLabelText: 'it\'s text for label in previous btn',
    firstLabelText: 'it\'s text for label in first btn',
    lastLabelText: 'it\'s text for label in last btn',
    currentPageLabelText: 'It\'s a current page',
    pageLabelText: 'It\'s a page'
  };
}
