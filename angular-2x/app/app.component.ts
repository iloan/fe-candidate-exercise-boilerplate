import { Component,
  Directive
} from 'angular2/core';
import {MyRepeatIf} from './for';

@Component({
  selector: 'my-app',
  directives: [MyRepeatIf],
  template: `
  <h1>Welcome to Angular 2</h1>
  `
})
export class AppComponent {
  people: any[];

  constructor() {
  }
}
