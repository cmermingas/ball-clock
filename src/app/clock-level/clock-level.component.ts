import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-clock-level',
  templateUrl: './clock-level.component.html',
  styleUrls: ['./clock-level.component.css']
})
export class ClockLevelComponent implements OnInit, OnDestroy {
  @Input() minValue: number;
  @Input() maxValue: number;
  @Input() step: number = 1;
  @Input() marbleSource: Observable<any>;
  sourceSubscription: Subscription;
  @Output() overflow = new EventEmitter<boolean>();
  marbles;
  marbleCount = 0;
  capacity;

  constructor() { }

  ngOnInit() {
    if (this.marbleSource) {
      this.sourceSubscription = this.marbleSource.subscribe(x => this.addMarble(x));
    }

    this.capacity = (this.maxValue - this.minValue) / this.step + 1;

    this.marbles = new Array(this.capacity);
    this.marbles.fill(null);
  }

  ngOnDestroy() {
    if (this.sourceSubscription) {
      this.sourceSubscription.unsubscribe();
    }
  }

  addMarble(x: any) {
    this.marbleCount += 1;

    if (this.marbleCount > this.capacity) {
      this.marbleCount = 0;
      this.marbles.fill(null);
      this.overflow.emit(true);
    } else {
      this.marbles[this.marbleCount - 1] = true;
    }
  }
}
