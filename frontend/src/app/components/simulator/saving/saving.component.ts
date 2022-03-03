import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  business = "";

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.business = params.business;
        this.dataService.getBusinessStyle(params.business).subscribe(data => {
          this.style = data;
          this.loadedData = true;
        }); 
      }
    );
  }

  submitSuperhabit(){
    localStorage.setItem('type', 'Superhabit');
    this.router.navigate(['/result'], {queryParams: {business: this.business}})
  }

  submitExcedente(){
    localStorage.setItem('type', 'Excedente 0');
    this.router.navigate(['/result'], {queryParams: {business: this.business}})
  }

}
