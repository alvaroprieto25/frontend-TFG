import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/interfaces/Project';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  providers: [DatePipe]
})
export class ResultComponent implements OnInit {

  style!: Style;
  loadedData = false;
  business = "";
  precio = "";
  mesesAhorro = "";
  project: Project = {id:0, consumption: 0, coordinates: "", surface: 0, orientation: "", type:"", nPanels:0, date:"", poblation:"", adress:""};
  myDate = new Date();


  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute, private datePipe: DatePipe) {
  }

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
        this.precio = String(Math.round(Number(localStorage.getItem('price'))));
        this.mesesAhorro = String(localStorage.getItem('monthsToPay'));
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
    this.project.consumption = Number(localStorage.getItem("consumption"));
    this.project.coordinates = String(localStorage.getItem("coords"));
    this.project.surface = Number(localStorage.getItem("surface"));
    this.project.orientation = String(localStorage.getItem("orientation"));
    this.project.type = String(localStorage.getItem("type"));
    this.project.nPanels = Number(localStorage.getItem("nPanels"));
    this.project.date = String(this.datePipe.transform(this.myDate, 'yyyy-MM-dd'));
    this.project.poblation = String(localStorage.getItem("poblation"));
    this.project.adress = String(localStorage.getItem("adress"));
    this.dataService.postProject(this.project).subscribe(data => {
      localStorage.setItem("projectId", String(data.id));
      this.router.navigate(['/budget'], {queryParams: {business: this.business}});
    });
  }

}
