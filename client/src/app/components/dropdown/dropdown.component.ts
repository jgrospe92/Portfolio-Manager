import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  imports: [NgbDropdownModule, CommonModule],
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() items: string[] = [];
  @Output() itemSelected = new EventEmitter<string>();

  selectedLabel: string = 'Select an portfolio';
  isOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleDropDown(): void {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: string) {
    this.selectedLabel = item;
    this.isOpen = false;
    this.itemSelected.emit(item);
  }
}
