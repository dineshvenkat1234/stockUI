import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  companies:company[] | any;

  private apiGetAll:string = 'http://localhost:8086/api/v1.0/market/company/getall';
  private apiAddCompany:string = 'http://localhost:8086/api/v1.0/market/company/register';
  private apiDeleteCompany:string = 'http://localhost:8086/api/v1.0/market/company/delete';
  private apiGetCompany:string = 'http://localhost:8086/api/v1.0/market/company/info';
  private apiAddStockPrice:string = 'http://localhost:8086/api/v1.0/market/stock/add';
  private apiUpdateStockPrice:string = 'http://localhost:8086/api/v1.0/market/stock/put';

  getAllCompanies():Observable<Array<company>>{
    return this.http.get<Array<company>>(this.apiGetAll);
  }

  addCompany(company:company):Observable<company>{
    return this.http.post<company>(this.apiAddCompany,company);
  }

  deleteCompany(companyId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiDeleteCompany}/${companyId}`);
  }

  getCompany(companyId:number):Observable<company>{
  return this.http.get<company>(`${this.apiGetCompany}/${companyId}`);
  }

  addStockPrice(company:company):Observable<company>{
    return this.http.post<company>(`${this.apiAddStockPrice}/${company.companyCode}`,company);
  }

  updateStockPrice(company:company):Observable<company>{
    return this.http.put<company>(`${this.apiUpdateStockPrice}/${company.companyCode}`,company);
  }
}
