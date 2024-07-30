import { Component, OnInit, Input } from '@angular/core';
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
  selectedLabel: string = 'Select an item';
  isOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleDropDown(): void {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: string) {
    this.selectedLabel = item;
    this.isOpen = false;
  }
}
