import { Component, OnInit } from '@angular/core';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';

declare const google: any;



@Component({
  selector: 'app-ubication',
  templateUrl: './ubication.component.html',
  styleUrls: ['./ubication.component.scss']
})
export class UbicationComponent implements OnInit {

  style!: Style;
  loadedData = false;
  lat = 38.348218;
  lng =  -0.494039;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getBusinessStyle(6).subscribe(data => {
      this.style = data;
      this.loadedData = true;
    });
  }

  onMapReady(map: any){
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon"]
      },
      polygonOptions: {
        draggable: true,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'overlaycomplete', (e: { type: any; overlay: { getPath: () => { (): any; new(): any; getArray: { (): any; new(): any; }; }; }; }) => {
      // Polygon drawn
      if (e.type === google.maps.drawing.OverlayType.POLYGON) {
        //this is the coordinate, you can assign it to a variable or pass into another function.
        alert(e.overlay.getPath().getArray());
      }
    });
  }

}
