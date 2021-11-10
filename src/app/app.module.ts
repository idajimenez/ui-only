import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

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
import { SpaceProfilePreviewComponent } from './space-profile-preview/space-profile-preview.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { DigitOnlyDirective } from './digit-only.directive';
import { MultiselectInputComponent } from './multiselect-input/multiselect-input.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { SelectListComponent } from './select-list/select-list.component';


@NgModule({
  declarations: [
    AppComponent,
    PreviewFloorPlanComponent,
    SpaceSetupComponent,
    TabsComponent,
    RenderSvgComponent,
    ButtonsComponent,
    SpaceProfileFormComponent,
    SpaceProfilePreviewComponent,
    NumberInputComponent,
    DigitOnlyDirective,
    MultiselectInputComponent,
    AddLocationComponent,
    SelectListComponent
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
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
