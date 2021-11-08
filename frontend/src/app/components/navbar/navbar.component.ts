import { Component, OnInit } from '@angular/core';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

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
