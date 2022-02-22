import { Component, OnInit } from '@angular/core';
import { company } from './company';
import { CompanyService } from './company.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private companyService:CompanyService) { }

  ngOnInit(): void {
    this.viewAllCompanies();
    
  }

  
  companyArr:Array<company>=[];
  gridArr:Array<company>=[];
  public company=new company();
  public companyId:number| any;
  public companyCode:number | any;
  public newStock=new company();
  public updateStock=new company();
  public avgStockPrice:number| any;
  public maxStockPrice:number| any;
  public minStockPrice:number| any;
  public startDate:string| any;
  public endDate:string| any;
  displayedColumns: string[] = ['companyCode', 'companyName', 'companyCEO', 'turnover','website','stockExchange','stockPrice','timeStamp'];
  dataSource = this.companyArr;

  viewAllCompanies(){
    this.companyService.getAllCompanies().subscribe(
      data=>{
        console.log(Object.values(data));
        this.companyArr=Object.values(data);
        this.gridArr=this.companyArr;
      },
      error=>{
        console.log(error);
      }
    )
  }

  onSubmit(){
    console.log(this.company);
    this.companyService.addCompany(this.company).subscribe(
      data=>{
        console.log(Object.values(data));
        this.companyArr.push(data);
        alert("Company added successfully!");
      },
      error=>{
        console.log(error);
        alert("Unable to add Company");
      }
    )
  }

  deleteCompany(){
    console.log(this.companyId);
    this.companyService.deleteCompany(this.companyId).subscribe(
      data=>{
        console.log(data);
        let index=this.companyArr.findIndex(c=>c.companyCode==this.companyId);
        this.companyArr.splice(index,1);
        alert("Company Deleted!");
      },
      error=>{
        console.log(error);
        alert("Unable to Delete Company");
      }
    )
  }

  getCompany(){
    this.companyService.getCompany(this.companyCode).subscribe(
      data=>{
        console.log(Object.values(data));
        this.gridArr=[];
        this.gridArr.push(data);
      },
      error=>{
        console.log(error);
        alert("Unable to Get Company");
      }
    )
  }
  addStockPrice(){
    this.companyService.addStockPrice(this.newStock).subscribe(
      data=>{
        console.log(Object.values(data));
        alert("Stock Price added successfully!");
      },
      error=>{
        console.log(error);
        alert("Unable to add Stock Price");
      }
      
    )
  }

  updateStockPrice(){
    this.companyService.updateStockPrice(this.updateStock).subscribe(
      data=>{
        console.log(Object.values(data));
        alert("Stock Price updated successfully!");
      },
      error=>{
        console.log(error);
        alert("Unable to update Stock Price");
      }
    )
  }

  getAverageStockPrice(){
    let total=0;
    let max=0,min=this.companyArr[0].stockPrice;
    for (let index = 0; index < this.companyArr.length; index++) {
      const companyElement = this.companyArr[index];
      if (companyElement.stockPrice>max) {
        max=companyElement.stockPrice;
      }
      if (companyElement.stockPrice<min) {
        min=companyElement.stockPrice;
      }
      total=total+companyElement.stockPrice;
    }
    this.avgStockPrice=total/this.companyArr.length;
    this.maxStockPrice=max;
    this.minStockPrice=min;
    console.log(this.avgStockPrice);
  }

  
}
