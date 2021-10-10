import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';

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
import { SpaceProfileFormComponent } from './space-profile-form/space-profile-form.component';


@NgModule({
  declarations: [
    AppComponent,
    PreviewFloorPlanComponent,
    SpaceSetupComponent,
    TabsComponent,
    RenderSvgComponent,
    ButtonsComponent,
    SpaceProfileFormComponent
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
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
