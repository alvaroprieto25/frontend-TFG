import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Style } from '../interfaces/Style';
import { Business } from '../interfaces/Business';
import { Budget } from '../interfaces/Budget';
import { Client } from '../interfaces/Client';
import { Project } from '../interfaces/Project';
import { ClientList } from '../interfaces/ClientList';
import { BudgetList } from '../interfaces/BudgetList';
import { ProjectList } from '../interfaces/ProjectList';
import { SolarApi } from '../interfaces/SolarApi';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getBusinessStyle(id: number){
    return this.http.get<Style>('http://localhost:8080/business/' + id + '/getStyle');
  }

  getBusiness(id: number){
    return this.http.get<Business>('http://localhost:8080/business/' + id);
  }

  getClient(clientId: number){
    return this.http.get<Client>('http://localhost:8080/client/' + clientId);
  }

  getClientBudgets(clientId: number){
    return this.http.get<BudgetList>('http://localhost:8080/client/' + clientId + "/getBudgets");
  }

  getClientProjects(clientId: number){
    return this.http.get<ProjectList>('http://localhost:8080/client/' + clientId + "/getProjects");
  }

  getBudget(budgetId: number){
    return this.http.get<Budget>('http://localhost:8080/budget/' + budgetId);
  }

  getProject(projectId: number){
    return this.http.get<Project>('http://localhost:8080/project/' + projectId);
  }

  getProjectClient(projectId: number){
    return this.http.get<Client>('http://localhost:8080/project/' + projectId + "/getClient");
  }

  getProjectBudget(projectId: number){
    return this.http.get<Budget>('http://localhost:8080/project/' + projectId + "/getBudget");
  }

  getBusinessClients(id: number){
    return this.http.get<ClientList>('http://localhost:8080/business/' + id + '/getClients');
  }

  getBusinessBudgets(id: number){
    return this.http.get<BudgetList>('http://localhost:8080/business/' + id + '/getBudgets');
  }

  getBusinessProjects(id: number){
    return this.http.get<ProjectList>('http://localhost:8080/business/' + id + '/getProjects');
  }

  postBudget(budget: Budget){
    return this.http.post<null>('http://localhost:8080/budget/add', budget);
  }

  postClient(client: Client){
    return this.http.post<{id: number}>('http://localhost:8080/client/add', client);
  }

  postProject(project: Project){
    return this.http.post<{id: number}>('http://localhost:8080/project/add', project);
  }

  login(email: string, password: string){
    return this.http.post<{correcto: boolean, error: string, token: string}>('http://localhost:8080/login', {email: String(email), password: String(password)});
  }

  solarRadiation(lat: number, lon: number){
    return this.http.get<SolarApi>('https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=hBq3C86VYZ93cw6P1UkFxNRCtd2gcwmrj1GRSDPp&lat=' + lat + '&lon=' + lon);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }
}
