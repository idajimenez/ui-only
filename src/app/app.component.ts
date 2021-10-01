import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'first-app';

  public addFloorPlanViews: any[] = [
    { title: 'FLOOR PLAN DETAILS', component:  `<app-floor-plan-details></app-floor-plan-details>` },
    { title: 'FLOOR PLAN DETAILS', component: `<app-preview-floor-plan></app-preview-floor-plan>` },
    { title: 'SPACE SETUP', component: '' },
    { title: 'REVIEW & PUBLISH', component: '' }
  ];
}
