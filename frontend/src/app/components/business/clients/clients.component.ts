import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/interfaces/Business';
import { Client } from 'src/app/interfaces/Client';
import { ClientList } from 'src/app/interfaces/ClientList';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  style!: Style;
  loadedData = false;
  business = "";
  businessData!: Business;
  clients: Array<Client> = [];

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
        }); 
        this.dataService.getBusiness(params.business).subscribe(data => {
          this.businessData = data;
          this.dataService.getBusinessClients(Number(this.business)).subscribe(data => {
            this.clients = data.clients;
            this.loadedData = true;
          });
        });
      }
    );
  }

  goBack(){
    this.router.navigate(['/business'], {queryParams: {business: this.business}});
  }

  detailBudget(id: number){
    this.dataService.getClientBudgets(id).subscribe(data => {
      this.router.navigate(['/detail-budget'], {queryParams: {business: this.business, budget: data.budgets[0].id}});
    }); 
  }

  detailProject(id: number){
    this.dataService.getClientProjects(id).subscribe(data => {
      this.router.navigate(['/detail-project'], {queryParams: {business: this.business, project: data.projects[0].id}});
    }); 
  }

}
