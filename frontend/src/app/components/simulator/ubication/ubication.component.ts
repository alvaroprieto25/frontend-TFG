import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  business = "";

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if(!params.business){
          this.router.navigate(['/error']);
        }
        this.business = params.business;
        this.dataService.getBusinessStyle(params.business).subscribe(data => {
          this.style = data;
          this.loadedData = true;
        }); 
      }
    );
  }

  onMapReady(map: any){
    this.initDrawingManager(map);
  }

  submit(){
    this.router.navigate(['/saving'], {queryParams: {business: this.business}});
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
        localStorage.setItem('coords', e.overlay.getPath().getArray());
        localStorage.setItem('surface', google.maps.geometry.spherical.computeArea(e.overlay.getPath()));
      }
    });
  }

}
