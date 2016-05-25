import { Component,
  Directive,
  Input,
  ChangeDetectorRef,
  ViewRef,
  ViewContainerRef,
  TemplateRef,
  DoCheck,
  IterableDiffers,
  IterableDiffer,
} from 'angular2/core';


@Directive({
  selector: '[ngBookRepeat]',
  inputs: ['ngBookRepeatOf']
})
export class MyRepeatIf implements DoCheck {
  private items: any;
  private differ: IterableDiffer;
  private views: Map<any, ViewRef> = new Map<any, ViewRef>();


  constructor(private viewContainer: ViewContainerRef,
              private template: TemplateRef,
              private changeDetector: ChangeDetectorRef,
              private differs: IterableDiffers) {}

  set ngBookRepeatOf(items) {
    this.items = items;
    if (this.items && !this.differ) {
      this.differ = this.differs.find(items).create(this.changeDetector);
    }
  }

  ngDoCheck(): void {
    if (this.differ) {
      let changes = this.differ.diff(this.items);
      if (changes) {
        console.log('template', this.template);
        changes.forEachAddedItem((change) => {
          let view = this.viewContainer.createEmbeddedView(this.template);
          view.setLocal('\$implicit', change.item);
          this.views.set(change.item, view);
        });
        changes.forEachRemovedItem((change) => {
          let view = this.views.get(change.item);
          let idx = this.viewContainer.indexOf(view);
          this.viewContainer.remove(idx);
          this.views.delete(change.item);
        });
      }
    }
  }
}
