import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutComponent } from './base-layout/layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavigationComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule
  ]
})
export class LayoutModule { }
