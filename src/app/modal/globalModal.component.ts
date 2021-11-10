import { Component, OnInit, ViewChild, Inject, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FloorPlanServices } from '../../../services/FloorPlanServices';

@Component({
  selector: 'app-globalModal',
  templateUrl: './globalModal.component.html',
  styleUrls: ['./globalModal.component.scss']
})
export class GlobalModalComponent implements OnInit {
  @ViewChild('target', { read: ViewContainerRef }) vcRef: ViewContainerRef;

  componentRef: ComponentRef<any>;

  public iconData: any;

  constructor(
    public fps: FloorPlanServices,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GlobalModalComponent>,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.iconData = this.data.icon;

    const factory = this.resolver.resolveComponentFactory(this.data.contentComponent);
    this.componentRef = this.vcRef.createComponent(factory);
    console.log(this.data.contentComponent)
  }

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }

  async retry() {
    const result = await this.isOnGoingSession();
    console.log(result)
  }

  redirect() {
    this.dialogRef.close('navigate');
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private isOnGoingSession(): Promise<object> {
    let currentDate = new Date();
    console.log(currentDate.toISOString())
    return new Promise((resolve, reject) => {
      try {
        this.fps.getSession(this.data.fp_ID).subscribe((res) => {
          // let result = this.calculateDateAndTime('2021-10-20T19:41:00.633Z');

          return resolve(res.data);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

}
