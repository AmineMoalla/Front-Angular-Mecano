import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    
    { path: '/employe', title: 'Employés',  icon:'person', class: '' },
    { path: '/piece', title: 'Piéces',  icon:'key', class: '' },
    { path: '/client', title: 'Clients',  icon:'groups', class: '' },
    { path: '/voiture', title: 'Voitures',  icon:'commute', class: '' },
    { path: '/reparation', title: 'Réparations',  icon: 'build', class: '' },

  ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
