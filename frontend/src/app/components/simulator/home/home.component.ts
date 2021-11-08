import { Component, OnInit } from '@angular/core';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  style!: Style;
  loadedData = false;

  constructor(private dataService: DataService) {
   
  }

  ngOnInit(): void {
    this.dataService.getBusinessStyle(6).subscribe(data => {
      this.style = data;
      this.loadedData = true;
    });
  }

}
