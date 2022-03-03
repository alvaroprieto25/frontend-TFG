import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/interfaces/Business';
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
  business = ""; 
  businessData!: Business;
  
  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.business = params.business;
        this.dataService.getBusinessStyle(params.business).subscribe(data => {
          this.style = data;
          this.loadedData = true;
        }); 
        this.dataService.getBusiness(params.business).subscribe(data => {
          this.businessData = data;
          console.log(this.businessData.name);
        }); 
      }
    );
  }

  backHome(){
    console.log("enrtra");
    localStorage.clear();
    this.router.navigate(['/'], {queryParams: {business: this.business}});
  }

}
