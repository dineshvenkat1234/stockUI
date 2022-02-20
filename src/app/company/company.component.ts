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
  public company=new company();
  public companyId:number| any;
  public companyCode:number | any;
  public newStock=new company();
  public updateStock=new company();

  viewAllCompanies(){
    this.companyService.getAllCompanies().subscribe(
      data=>{
        console.log(Object.values(data));
        this.companyArr=Object.values(data);
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
      },
      error=>{
        console.log(error);
      }
    )
  }

  deleteCompany(){
    console.log(this.companyId);
    this.companyService.deleteCompany(this.companyId).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }

  getCompany(){
    this.companyService.getCompany(this.companyCode).subscribe(
      data=>{
        console.log(Object.values(data));
      },
      error=>{
        console.log(error);
      }
    )
  }
  addStockPrice(){
    this.companyService.addStockPrice(this.newStock).subscribe(
      data=>{
        console.log(Object.values(data));
      },
      error=>{
        console.log(error);
      }
      
    )
  }

  updateStockPrice(){
    this.companyService.updateStockPrice(this.updateStock).subscribe(
      data=>{
        console.log(Object.values(data));
      },
      error=>{
        console.log(error);
      }
    )
  }
}
