import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges {
  @Input() rating = 0;
  @Output() starClicked: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  
  cropWidth = 75;
  starClickMe = false;
  
  ngOnChanges(): void {
      this.cropWidth = this.rating * (75/5)
  }

  
  gotClicked(): void {
    this.starClickMe = !this.starClickMe
  }
  
  onClick(): void {
    this.starClicked.emit(this.starClickMe);
  }
}