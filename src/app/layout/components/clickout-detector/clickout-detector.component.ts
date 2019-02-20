import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'gg-clickout',
  templateUrl: './clickout-detector.component.html',
})
export class ClickoutDetectorComponent implements OnInit, OnDestroy {
  @ViewChild('ref') ref: HTMLDivElement;
  @Output() clickout: EventEmitter<void> = new EventEmitter<void>();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.document.addEventListener('click', this.handleGlobalClick, true);
  }

  ngOnDestroy() {
    this.document.removeEventListener('click', this.handleGlobalClick, true);
  }

  private handleGlobalClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!this.isParentOf(target)) {
      this.clickout.emit();
    }
  };

  private isParentOf(target: HTMLElement): boolean {
    let currentTarget: HTMLElement | null = target;

    while (currentTarget) {
      if (currentTarget === this.ref) {
        return true;
      }

      currentTarget = currentTarget.parentElement;
    }

    return false;
  }
}
