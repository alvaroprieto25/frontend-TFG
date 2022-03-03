import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

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

  backHome(){
    localStorage.clear();
    this.router.navigate(['/consumption'], {queryParams: {business: this.business}});
  }

  contactButton(){
    this.router.navigate(['/business-info'], {queryParams: {business: this.business}});
  }

  budgetButton(){
    this.router.navigate(['/budget'], {queryParams: {business: this.business}});
  }

}
