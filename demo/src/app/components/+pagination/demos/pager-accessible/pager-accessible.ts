import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'demo-pagination-pager-accessible',
  templateUrl: './pager-accessible.html',
  styles: ['.pager li.btn:active { box-shadow: none; }'],
  encapsulation: ViewEncapsulation.None
})
export class DemoPagerAccessibleComponent {
  totalItems: number = 64;
  currentPage: number = 4;
  params: object = {
    navText: 'Navigation example',
    accessibleLinks: true,
    previousAccessibleText: '&larr;',
    nextAccessibleText: '&rarr;',
    nextLabelText: 'it\'s text for label in next btn',
    previousLabelText: 'it\'s text for label in previous btn'
  };
}
