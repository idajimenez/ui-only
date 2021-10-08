import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { PreviewFloorPlanComponent } from './preview-floor-plan/preview-floor-plan.component';
import { SpaceSetupComponent } from './space-setup/space-setup.component';
import { TabsComponent } from './tabs/tabs.component';
import { RenderSvgComponent } from './render-svg/render-svg.component';
import { ButtonsComponent } from './buttons-reusable/buttons.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    PreviewFloorPlanComponent,
    SpaceSetupComponent,
    TabsComponent,
    RenderSvgComponent,
    ButtonsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
