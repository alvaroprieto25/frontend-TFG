import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/interfaces/Business';
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
  businessData!: Business;

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
        this.dataService.getBusiness(params.business).subscribe(data => {
          this.businessData = data;
        }); 
      }
    );
  }

  submitSuperhabit(){
    localStorage.setItem('type', 'Superhabit');
    let cords = localStorage.getItem('coords');
    let cord = cords?.substring(1, cords.indexOf(')'));
    let lat = cord?.substring(0, cord.indexOf(','));
    let lon = cord?.substring(cord.indexOf(',') + 2, cord.length);
    //MOCKED
    this.dataService.solarRadiation(40, -105).subscribe(data => {
      let radiation = data.outputs.avg_dni.annual;
      //6m2 por cada placa
      let nPanels = Math.round(Number(localStorage.getItem('surface'))/6);
      localStorage.setItem('nPanels', String(nPanels));
      let price = nPanels * this.businessData.pricePanel + this.businessData.priceInstallation;
      localStorage.setItem('price', String(price));
      localStorage.setItem('monthsToPay', String(Math.round(price/Number(localStorage.getItem('lastPrice')))));
      this.router.navigate(['/result'], {queryParams: {business: this.business}})
    });
  }

  submitExcedente(){
    localStorage.setItem('type', 'Excedente 0');
    let cords = localStorage.getItem('coords');
    let cord = cords?.substring(1, cords.indexOf(')'));
    let lat = cord?.substring(0, cord.indexOf(','));
    let lon = cord?.substring(cord.indexOf(',') + 2, cord.length);
    //MOCKED  
    this.dataService.solarRadiation(40, -105).subscribe(data => {
      let radiation = data.outputs.avg_dni.annual;
      let nPanels = Math.round(Number(localStorage.getItem('consumption')) / (this.businessData.capacityPanel * (radiation/12)));
      localStorage.setItem('nPanels', String(nPanels));
      let price = nPanels * this.businessData.pricePanel + this.businessData.priceInstallation;
      localStorage.setItem('price', String(price));
      localStorage.setItem('monthsToPay', String(Math.round(price/Number(localStorage.getItem('lastPrice')))));
      this.router.navigate(['/result'], {queryParams: {business: this.business}})
    });
  }

}
