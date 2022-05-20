import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/interfaces/Business';
import { Project } from 'src/app/interfaces/Project';
import { Style } from 'src/app/interfaces/Style';
import { DataService } from 'src/app/services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.scss']
})
export class DetailProjectComponent implements OnInit {

  style!: Style;
  loadedData = false;
  business = "";
  projectId = "";
  businessData!: Business;
  projectData!: Project;

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
        this.dataService.getProject(Number(params.project)).subscribe(data => {
          this.projectData = data;
          this.projectData.date = this.projectData.date.substring(0, this.projectData.date.search('T'));
        });
      }
    );
  }

  goBack(){
    this.location.back();
  }
}
