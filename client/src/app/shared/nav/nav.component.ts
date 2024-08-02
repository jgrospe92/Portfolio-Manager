import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  name: string = 'Portfolio Manager';

  isLogin: boolean = false;
  btnStyle: string = 'btn btn-success me-3';

  isMenuCollapsed: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.router.navigate(['/portfolio']);
  }
}
