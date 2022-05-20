import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from 'src/app/interfaces/Budget';
import { Business } from 'src/app/interfaces/Business';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {

  style!: Style;
  loadedData = false;
  business = "";
  businessData!: Business;
  budgets: Array<Budget> = [];

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
        this.dataService.getBusinessBudgets(Number(this.business)).subscribe(data2 => {
          this.budgets = data2.budgets;
          for(var b of this.budgets){
            b.date = b.date.substring(0, b.date.search('T'));
          }
          this.loadedData = true;
        });
      }
    );
  }

  goBack(){
    this.router.navigate(['/business'], {queryParams: {business: this.business}});
  }

  detailProject(id: number){
    this.router.navigate(['/detail-project'], {queryParams: {business: this.business, project: id}});
  }

  detailClient(id: number){
    this.router.navigate(['/detail-client'], {queryParams: {business: this.business, client: id}});
  }

}
