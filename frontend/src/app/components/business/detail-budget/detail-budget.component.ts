import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from 'src/app/interfaces/Budget';
import { Business } from 'src/app/interfaces/Business';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-budget',
  templateUrl: './detail-budget.component.html',
  styleUrls: ['./detail-budget.component.scss']
})
export class DetailBudgetComponent implements OnInit {

  style!: Style;
  loadedData = false;
  business = "";
  budgetId = "";
  businessData!: Business;
  budgetData!: Budget;

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute, private location: Location) { }

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
        this.budgetId = params.budget;
        this.dataService.getBudget(params.budget).subscribe(data => {
          this.budgetData = data;
          this.budgetData.date = this.budgetData.date.substring(0, this.budgetData.date.search('T'));
        });
      }
    );
  }

  goBack(){
    this.location.back();
  }

}
