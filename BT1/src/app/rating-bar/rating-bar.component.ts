import {Component, OnInit, Input, EventEmitter, OnChanges, Output, SimpleChanges} from '@angular/core';
import {IRatingUnit} from "../irating-unit";

@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.css']
})
export class RatingBarComponent implements OnInit, OnChanges {
  @Input() max = 10;
  @Input() ratingValue = 5;
  @Input() showRatingValue = true;

  @Output() reateChange = new EventEmitter<number>();
  ratingUnits: Array<IRatingUnit> = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('max' in changes) {
      let max = changes.max.currentValue;
      max = typeof max === 'undefined' ? 5 : max;
      this.max = max;
      this.calculate(max, this.ratingValue);
    }
  }

  calculate(max: any, ratingValue: number) {
    this.ratingUnits = Array.from({length: max},
      (_, index) => ({
        value: index + 1,
        active: index < ratingValue
      }));
  }

  ngOnInit() {
    this.calculate(this.max, this.ratingValue);
  }
  select(index: number) {
    this.ratingValue = index + 1;
    this.ratingUnits.forEach((item, idx) => item.active = idx < this.ratingValue);
    this.reateChange.emit(this.ratingValue);
  }
  enter(index: number) {
    this.ratingUnits.forEach((item, idx) => item.active = idx <= index);
  }
  reset() {
    this.ratingUnits.forEach((item, idx) => item.active = idx < this.ratingValue);
  }
}
