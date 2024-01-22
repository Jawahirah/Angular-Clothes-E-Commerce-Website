import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeSectionComponent } from './components/welcome-section/welcome-section/welcome-section.component';
import { HomeComponent } from './home.component';
import { CategorySectionComponent } from './components/category-section/category-section.component';
import { RouterModule } from '@angular/router';
import { AdvertisingComponent } from './components/advertising/advertising.component';


@NgModule({
  declarations: [
    WelcomeSectionComponent,  
    HomeComponent, 
    CategorySectionComponent, AdvertisingComponent
  ],
  imports: [
    CommonModule,
    RouterModule 
  ],exports:[
    WelcomeSectionComponent,
    HomeComponent,
    CategorySectionComponent
  ]
})
export class HomeModule { }
