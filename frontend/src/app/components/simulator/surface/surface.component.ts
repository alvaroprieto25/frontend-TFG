import { Component, OnInit } from '@angular/core';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-surface',
  templateUrl: './surface.component.html',
  styleUrls: ['./surface.component.scss']
})
export class SurfaceComponent implements OnInit {

  style!: Style;
  loadedData = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getBusinessStyle(6).subscribe(data => {
      this.style = data;
      this.loadedData = true;
    });
  }

}
