import { Component, OnInit } from '@angular/core';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-saving',
  templateUrl: './saving.component.html',
  styleUrls: ['./saving.component.scss']
})
export class SavingComponent implements OnInit {

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
