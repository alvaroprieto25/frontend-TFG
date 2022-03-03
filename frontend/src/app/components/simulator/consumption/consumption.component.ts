import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit {

  style!: Style;
  loadedData = false;
  card1 = false;
  card2 = false;
  business = "";
  
  consumptionForm = new FormGroup({
    consumption: new FormControl(),
    type: new FormControl()
  });

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

  submit(){
    if(this.consumptionForm.value.type === 'Anual'){
      this.consumptionForm.value.consumption = this.consumptionForm.value.consumption / 12;
    }
    localStorage.setItem('consumption', this.consumptionForm.value.consumption);
    this.router.navigate(['/ubication'], {queryParams: {business: this.business}});
  }

  toggleCard1() {
    this.card1 = !this.card1;
    if(this.card1){
      this.card2 = false;
    }
  }

  toggleCard2(){
    this.card2 = !this.card2;
    if(this.card2){
      this.card1 = false;
    }
  }

  customConsumptionButton(){
    this.router.navigate(['/custom-consumption'], {queryParams: {business: this.business}});
  }

}
