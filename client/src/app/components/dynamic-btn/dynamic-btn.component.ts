import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-btn',
  templateUrl: './dynamic-btn.component.html',
  styleUrls: ['./dynamic-btn.component.scss'],
})
export class DynamicBtnComponent implements OnInit {
  @Input() btnText!: string;
  @Input() dynamicStyle!: string;
  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.btnClick.emit();
  }
}
