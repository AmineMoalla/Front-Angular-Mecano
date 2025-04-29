import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EmployeComponent } from './employe/employe.component';
import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'home', // Redirect root to 'home'
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent, // Home route
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule), // Lazy-loaded AuthModule
  },
  {
    path: 'cars',
    component: CarsComponent, // Route for CarsComponent
  },

  // {
  //   path: 'dashboard',
  //   component: DashboardComponent, // Route for CarsComponent
  // },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/admin-layout/admin-layout.module').then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
 

  
];

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'dashboard', // Redirige vers 'home'
//     pathMatch: 'full',
//   },

//   {
//     path: 'dashboard',
//     component: DashboardComponent, // Route pour DashboardComponent
//   },

//   // {
//   //   path: '',
//   //   redirectTo: 'home', // Redirige vers 'home'
//   //   pathMatch: 'full',
//   // },
//   {
//     path: 'home',
//     component: HomeComponent, // Route pour HomeComponent
//   },
//   {
//     path: 'auth',
//     loadChildren: () =>
//       import('./auth/auth.module').then((m) => m.AuthModule), // Lazy-loaded AuthModule
//   },
//   {
//     path: 'cars',
//     component: CarsComponent, // Route pour CarsComponent
//   },
 
//   {
//     path: 'admin',
//     component: AdminLayoutComponent, // Admin layout
//     children: [
//       {
//         path: '',
//         loadChildren: () =>
//           import('./layouts/admin-layout/admin-layout.module').then(
//             (m) => m.AdminLayoutModule
//           ),
//       },
//     ],
//   },

//   {
//     path: '**',
//     redirectTo: 'dashboard', // Fallback route
//   },
// ];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
