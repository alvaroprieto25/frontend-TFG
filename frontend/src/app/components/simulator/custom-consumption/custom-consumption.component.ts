import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-custom-consumption',
  templateUrl: './custom-consumption.component.html',
  styleUrls: ['./custom-consumption.component.scss']
})
export class CustomConsumptionComponent implements OnInit {

  style!: Style;
  loadedData = false;
  totalConsumption = 0;
  business = "";

  customConsumptionForm = new FormGroup({
    nombre: new FormControl(),
    consumo: new FormControl(),
    uso: new FormControl()
  });

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {let consumo = 0}

  ngOnInit(): void {
    localStorage.setItem("consumption", "0");
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

  addNewConsumption(){
    let actualConsumption = localStorage.getItem("consumption");
    let consumo = this.customConsumptionForm.value.consumo * this.customConsumptionForm.value.uso;
    consumo = consumo + Number(actualConsumption); 
    this.totalConsumption = consumo;
    console.log(consumo);
    localStorage.setItem("consumption", consumo.toString());
  }

  nextPage(){
    this.router.navigate(['/ubication'], {queryParams: {business: this.business}});
  }

}
