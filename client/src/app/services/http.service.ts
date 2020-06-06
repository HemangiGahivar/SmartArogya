import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';


const headers = new HttpHeaders().set

@Injectable()
export class HttpService {

    
     docHeaderObj  = new HttpHeaders().append('x-ibm-client-id', environment.DOC_API_KEY).
     append('accept' , 'application/json')
     .append('Content-Type' , 'application/json');

     ambHeaderObj  = new HttpHeaders().append('x-ibm-client-id', environment.AMBULANCE_API_KEY).
     append('accept' , 'application/json')
     .append('Content-Type' , 'application/json');

   // doctorsList : Observable<any[]>;
  constructor(private http: HttpClient) { 
       
  
  }

  getAllDoctors():Observable<any> {
    //return this.http.get<any>('https://f21387cd.eu-gb.apigw.appdomain.cloud/doc', {headers: this.headerObj});
    return this.http.get(environment.API_URL+ '/doc',  {'headers':this.docHeaderObj});
  }

  getAllHospital():Observable<any> {
    return this.http.get<any>('https://f21387cd.eu-gb.apigw.appdomain.cloud/hospital');
  }  

  getAllLabs():Observable<any> {
    return this.http.get<any>('https://f21387cd.eu-gb.apigw.appdomain.cloud/lab');
  }   

  getAllPharma():Observable<any> {
    return this.http.get<any>('https://f21387cd.eu-gb.apigw.appdomain.cloud/pharma');
  }  
  
  getAllAmbulance():Observable<any> {
    //return this.http.get<any>('https://f21387cd.eu-gb.apigw.appdomain.cloud/ambulance');
    return this.http.get<any>(environment.API_URL+ '/ambulance', {headers: this.ambHeaderObj});
  }    


}