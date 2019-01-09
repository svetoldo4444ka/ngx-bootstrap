// tslint:disable:max-file-line-count max-line-length
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

import { isBs3, Utils } from 'ngx-bootstrap/utils';
import { PositioningService } from 'ngx-bootstrap/positioning';

import { latinize } from './typeahead-utils';
import { TypeaheadMatch } from './typeahead-match.class';
import { TypeaheadDirective } from './typeahead.directive';
import { typeaheadAnimation } from './typeahead-animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'typeahead-container',
  templateUrl: './typeahead-container.component.html',
  host: {
    class: 'dropdown open bottom',
    '[class.dropdown-menu]': 'isBs4',
    '[style.height]': `isBs4 && needScrollbar ? guiHeight: 'auto'`,
    '[style.visibility]': `'inherit'`,
    '[class.dropup]': 'dropup',
    style: 'position: absolute;display: block;'
  },
  styles: [
    `
    :host.dropdown {
      z-index: 1000;
    }

    :host.dropdown-menu, .dropdown-menu {
      overflow-y: auto;
      height: 100px;
    }
  `
  ],
  animations: [typeaheadAnimation]
})
export class TypeaheadContainerComponent implements OnDestroy, OnInit {
  parent: TypeaheadDirective;
  query: string[] | string;
  isFocused = false;
  top: string;
  left: string;
  display: string;
  placement: string;
  dropup: boolean;
  guiHeight: string;
  needScrollbar: boolean;
  animationState: string;
  positionServiceSubscription: Subscription;
  height = 0;
  actionEmitter = new EventEmitter<any>();
  @Output() getIsActiveClass = new EventEmitter<any>();

  get isBs4(): boolean {
    return !isBs3();
  }

  get typeaheadTemplateMethods(): {} {
    const self = this;

    return {
      isBs4: self.isBs4,
      selectMatch: this.selectMatch.bind(self),
      selectActive: this.selectActive.bind(self),
      isActive: this.isActive.bind(self)
    };
  }

  protected _active: TypeaheadMatch;
  protected _matches: TypeaheadMatch[] = [];

  @ViewChild('ulElement', { static: false })
  private ulElement: ElementRef;

  @ViewChildren('liElements')
  private liElements: QueryList<ElementRef>;

  constructor(
    private positionService: PositioningService,
    private renderer: Renderer2,
    public element: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.positionServiceSubscription = this.positionService.event$.subscribe(
      () => {
        if (this.isAnimated) {
          this.animationState = this.isTopPosition ? 'animated-up' : 'animated-down';
          this.changeDetectorRef.detectChanges();

          return;
        }

        this.animationState = 'unanimated';
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  get active(): TypeaheadMatch {
    return this._active;
  }

  get matches(): TypeaheadMatch[] {
    return this._matches;
  }

  set matches(value: TypeaheadMatch[]) {
    this.positionService.setOptions({
      modifiers: { flip: { enabled: this.adaptivePosition } },
      allowedPositions: ['top', 'bottom']
    });

    this._matches = value;

    this.needScrollbar = this.typeaheadScrollable && this.typeaheadOptionsInScrollableView < this.matches.length;

    if (this.typeaheadScrollable) {
      setTimeout(() => {
        this.setScrollableMode();
      });
    }

    if (this.typeaheadIsFirstItemActive && this._matches.length > 0) {
      this._active = this._matches[0];

      if (this._active.isHeader()) {
        this.nextActiveMatch();
      }
    }

    if (this._active && !this.typeaheadIsFirstItemActive) {
      const concurrency = this._matches.find(match => match.value === this._active.value);

      if (concurrency) {
        this.selectActive(concurrency);

        return;
      }

      this._active = null;
    }
  }

  get isTopPosition(): boolean {
    return this.element.nativeElement.classList.contains('top');
  }

  // tslint:disable-next-line:no-any
  get optionsListTemplate(): TemplateRef<any> {
    return this.parent ? this.parent.optionsListTemplate : undefined;
  }

  get isAnimated(): boolean {
    return this.parent ? this.parent.isAnimated : false;
  }

  get adaptivePosition(): boolean {
    return this.parent ? this.parent.adaptivePosition : false;
  }

  get typeaheadScrollable(): boolean {
    return this.parent ? this.parent.typeaheadScrollable : false;
  }

  get typeaheadOptionsInScrollableView(): number {
    return this.parent ? this.parent.typeaheadOptionsInScrollableView : 5;
  }

  get typeaheadIsFirstItemActive(): boolean {
    return this.parent ? this.parent.typeaheadIsFirstItemActive : true;
  }
  // tslint:disable-next-line:no-any
  get itemTemplate(): TemplateRef<any> {
    return this.parent ? this.parent.typeaheadItemTemplate : undefined;
  }

  ngOnInit(): void {
    this.actionEmitter.subscribe((data: any) => {
      switch (data.eventType) {
        case 'click':
          this.selectMatch(data.match, data.event);
          break;
        case 'mouseenter':
          this.selectActive(data.match);
          break;
        case 'isHasClass':
          const value = this.isActive(data.match);
          if (value) {
            data.isActive = true;
            this.getIsActiveClass.emit(data.isActive);
          }
          break;
        default:
          return;
      }
    });
  }

  selectActiveMatch(isActiveItemChanged?: boolean): void {
    if (this._active && this.parent.typeaheadSelectFirstItem) {
      this.selectMatch(this._active);
    }

    if (!this.parent.typeaheadSelectFirstItem && isActiveItemChanged) {
      this.selectMatch(this._active);
    }
  }

  prevActiveMatch(): void {
    const index = this.matches.indexOf(this._active);

    this._active = this.matches[
      index - 1 < 0 ? this.matches.length - 1 : index - 1
    ];

    if (this._active.isHeader()) {
      this.prevActiveMatch();
    }

    if (this.typeaheadScrollable) {
      this.scrollPrevious(index);
    }
  }

  nextActiveMatch(): void {
    const index = this.matches.indexOf(this._active);

    this._active = this.matches[
      index + 1 > this.matches.length - 1 ? 0 : index + 1
    ];

    if (this._active.isHeader()) {
      this.nextActiveMatch();
    }

    if (this.typeaheadScrollable) {
      this.scrollNext(index);
    }
  }

  selectActive(value: TypeaheadMatch): void {
    this.isFocused = true;
    this._active = value;
  }

  highlight(match: TypeaheadMatch, query: string[] | string): string {
    let itemStr: string = match.value;
    let itemStrHelper: string = (this.parent && this.parent.typeaheadLatinize
      ? latinize(itemStr)
      : itemStr).toLowerCase();
    let startIdx: number;
    let tokenLen: number;
    // Replaces the capture string with the same string inside of a "strong" tag
    if (typeof query === 'object') {
      const queryLen: number = query.length;
      for (let i = 0; i < queryLen; i += 1) {
        // query[i] is already latinized and lower case
        startIdx = itemStrHelper.indexOf(query[i]);
        tokenLen = query[i].length;
        if (startIdx >= 0 && tokenLen > 0) {
          itemStr =
            `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
            `${itemStr.substring(startIdx + tokenLen)}`;
          itemStrHelper =
            `${itemStrHelper.substring(0, startIdx)}        ${' '.repeat(tokenLen)}         ` +
            `${itemStrHelper.substring(startIdx + tokenLen)}`;
        }
      }
    } else if (query) {
      // query is already latinized and lower case
      startIdx = itemStrHelper.indexOf(query);
      tokenLen = query.length;
      if (startIdx >= 0 && tokenLen > 0) {
        itemStr =
          `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
          `${itemStr.substring(startIdx + tokenLen)}`;
      }
    }

    return itemStr;
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  focusLost(): void {
    this.isFocused = false;
  }

  isActive(value: TypeaheadMatch): boolean {
    return this._active === value;
  }

  selectMatch(value: TypeaheadMatch, e: Event = void 0): boolean {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.parent.changeModel(value);
    setTimeout(() => this.parent.typeaheadOnSelect.emit(value), 0);

    return false;
  }

  setScrollableMode(): void {
    if (!this.ulElement) {
      this.ulElement = this.element;
    }

    if (this.liElements.first) {
      const ulStyles = Utils.getStyles(this.ulElement.nativeElement);
      const liStyles = Utils.getStyles(this.liElements.first.nativeElement);
      const ulPaddingBottom = parseFloat((ulStyles['padding-bottom'] ? ulStyles['padding-bottom'] : '')
        .replace('px', ''));
      const ulPaddingTop = parseFloat((ulStyles['padding-top'] ? ulStyles['padding-top'] : '0')
        .replace('px', ''));
      const optionHeight = parseFloat((liStyles.height ? liStyles.height : '0')
        .replace('px', ''));
      const height = this.typeaheadOptionsInScrollableView * optionHeight;
      this.guiHeight = `${height + ulPaddingTop + ulPaddingBottom}px`;
    }

    this.renderer.setStyle(this.element.nativeElement, 'visibility', 'visible');
  }

  scrollPrevious(index: number): void {
    if (index === 0) {
      this.scrollToBottom();

      return;
    }
    if (this.liElements) {
      const liElement = this.liElements.toArray()[index - 1];
      if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
        this.ulElement.nativeElement.scrollTop = liElement.nativeElement.offsetTop;
      }
    }
  }

  scrollNext(index: number): void {
    if (index + 1 > this.matches.length - 1) {
      this.scrollToTop();

      return;
    }
    if (this.liElements) {
      const liElement = this.liElements.toArray()[index + 1];
      if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
        this.ulElement.nativeElement.scrollTop =
          liElement.nativeElement.offsetTop -
          Number(this.ulElement.nativeElement.offsetHeight) +
          Number(liElement.nativeElement.offsetHeight);
      }
    }
  }

  ngOnDestroy(): void {
    this.positionServiceSubscription.unsubscribe();
  }


  private isScrolledIntoView = function (elem: HTMLElement) {
    const containerViewTop: number = this.ulElement.nativeElement.scrollTop;
    const containerViewBottom = containerViewTop + Number(this.ulElement.nativeElement.offsetHeight);
    const elemTop = elem.offsetTop;
    const elemBottom = elemTop + elem.offsetHeight;

    return ((elemBottom <= containerViewBottom) && (elemTop >= containerViewTop));
  };

  private scrollToBottom(): void {
    this.ulElement.nativeElement.scrollTop = this.ulElement.nativeElement.scrollHeight;
  }

  private scrollToTop(): void {
    this.ulElement.nativeElement.scrollTop = 0;
  }
}
