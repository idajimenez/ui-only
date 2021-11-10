import { Component, OnInit, Input } from '@angular/core';
import { SpaceService } from '../services/space-services.service';

@Component({
  selector: 'app-multiselect-input',
  templateUrl: './multiselect-input.component.html',
  styleUrls: ['./multiselect-input.component.scss']
})
export class MultiselectInputComponent implements OnInit {
  public adjacentSpaceData: any = {};

  constructor(public spaceService: SpaceService) { }

  ngOnInit(): void {
    this.spaceService.liveAutoRefresh().subscribe(() => {
      this.getData();
    })
  }

  async getData() {
    let data = await this.spaceService.tempData;
    console.log(data);
    this.adjacentSpaceData = data;
  }

  handleRemoveItem = (index: number) => {
    const updatedItems = this.adjacentSpaceData.spaces;

    updatedItems.splice(index, 1);
    this.spaceService.passData({ spaces: updatedItems, isMax: updatedItems.length === 4  });
  }

  // async getData() {
  //   let data = await this.spaceService.tempData;
  //   this.adjacentSpaceData = data;
  // }

}
