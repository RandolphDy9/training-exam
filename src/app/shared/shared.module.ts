import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './components/layout/layout.module';
import { StaticDisplayComponent } from './components/static-display/static-display.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [StaticDisplayComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatTabsModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ],
  exports: [
    StaticDisplayComponent,
    LayoutModule,
    MatTabsModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class SharedModule { }
