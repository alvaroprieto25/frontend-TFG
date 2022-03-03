import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  style!: Style;
  loadedData = false;
  business = "";

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) {
   
  }

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

  nextPage(){
    this.router.navigate(['/consumption'], {queryParams: {business: this.business}});
  }

}
