import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BsDropdownState } from './bs-dropdown.state';
import { BsDropdownContainerComponent } from './bs-dropdown-container.component';

@Directive({
  selector: '[bsDropdownToggle],[dropdownToggle]',
  exportAs: 'bs-dropdown-toggle',
  host: {
    '[attr.aria-haspopup]': 'true'
  }
})
export class BsDropdownToggleDirective implements OnDestroy {
  _dropDownContainer: BsDropdownContainerComponent;
  @HostBinding('attr.disabled') isDisabled: boolean = null;

  // @HostBinding('class.active')
  @HostBinding('attr.aria-expanded') isOpen: boolean;

  _active: HTMLElement;
  index: number;
  flag: boolean;
  private _subscriptions: Subscription[] = [];


  constructor(private _state: BsDropdownState, private _element: ElementRef) {
    // sync is open value with state
    this._subscriptions.push(
      this._state.isOpenChange.subscribe(
        (value: boolean) => (this.isOpen = value)
      )
    );
    // populate disabled state
    this._subscriptions.push(
      this._state.isDisabledChange.subscribe(
        (value: boolean) => (this.isDisabled = value || null)
      )
    );
  }

  @HostListener('click', [])
  onClick(): void {
    if (this.isDisabled) {
      return;
    }
    this._state.toggleClick.emit(true);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any): void {
    if (
      this._state.autoClose &&
      event.button !== 2 &&
      !this._element.nativeElement.contains(event.target)
    ) {
      this._state.toggleClick.emit(false);
    }
  }

  @HostListener('keyup.esc')
  onEsc(): void {
    if (this._state.autoClose) {
      this._state.toggleClick.emit(false);
    }
  }

  @HostListener('window:keyup', ['$event'])
  onChange(e: any): void {
    e.stopPropagation();
    if (this.isOpen) {
      e.stopPropagation();
      // up
      if (e.keyCode === 38) {
        e.stopPropagation();
        console.log('up');
        this.prevActiveMatch(e: Event);
        console.log(8989);

      }

      // down
      if (e.keyCode === 40) {
        e.stopPropagation();
        console.log('down');
        this.nextActiveMatch(e: Event);
        console.log(1010);

      }

    }
  }


  nextActiveMatch(e: Event){
    e.stopPropagation();
    const nodelist = this._element.nativeElement.parentNode.children[1].children;
    const collectionItems = Array.from(nodelist);
    let result: any[] = [];

    for(let i = 0; i < nodelist.length; i++){
      result.push(nodelist[i]);
    }


    result = result.filter(item => item.hasAttribute('role'));


    if(!this._active){
      console.log(11);
      this._active = result[0];
      this.index = result.indexOf(this._active);
      console.log(result[this.index]);
      result[this.index].children[0].focus();
    } else {
      console.log(22);
      this._active = result[
        this.index + 1 > result.length - 1 ? 0 : this.index + 1
        ];
      this.index = result.indexOf(this._active);
      console.log(result[this.index]);
      result[this.index].children[0].focus();
    }
  }









  prevActiveMatch(e: Event){
    e.stopPropagation();
    const nodelist = this._element.nativeElement.parentNode.children[1].children;
    const collectionItems = Array.from(nodelist);
    let result: any[] = [];

    for(let i = 0; i < nodelist.length; i++){
      result.push(nodelist[i]);
    }


    result = result.filter(item => item.hasAttribute('role'));


    if(!this._active){

      this._active = result[0];
    }


    if(!this._active){
      console.log(11);
      this._active = result[0];
      this.index = result.indexOf(this._active);
      console.log(result[this.index]);
      result[this.index].children[0].focus();
    } else {
      console.log(22);
      this._active = result[
        this.index - 1 < 0 ? result.length - 1 : this.index - 1
        ];
      this.index = result.indexOf(this._active);
      console.log(result[this.index]);
      result[this.index].children[0].focus();
    }
  }

  // getDropDowmItems(element) {
  //
  // }

  ngOnDestroy(): void {
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
  }
}
