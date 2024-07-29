import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  name: string = 'Portfolio Manager';

  isMenuCollapsed: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
