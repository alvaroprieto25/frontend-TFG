import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private dataService: DataService, private router: Router){

  }

  canActivate(): boolean{
    if(this.dataService.loggedIn())
      return true;
    
    this.router.navigate(['/error']);
    return false;
  }
  
}
