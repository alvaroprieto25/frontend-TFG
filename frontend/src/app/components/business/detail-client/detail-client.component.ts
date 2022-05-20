import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/interfaces/Business';
import { Client } from 'src/app/interfaces/Client';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss']
})
export class DetailClientComponent implements OnInit {

  style!: Style;
  loadedData = false;
  business = "";
  clientId = "";
  businessData!: Business;
  clientData!: Client;

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
        this.dataService.getClient(params.client).subscribe(data => {
          this.clientData = data;
        });
      }
    );
  }

  goBack(){
    this.location.back();
  }

}
