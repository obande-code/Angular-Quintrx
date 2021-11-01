import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/APIs/user/user.service';

@Component({
  selector: 'app-documentmaster',
  templateUrl: './documentmaster.component.html',
  styleUrls: ['./documentmaster.component.scss']
})
export class DocumentmasterComponent implements OnInit {

  constructor(private UserService : UserService) { }
  btnName = "Submit"

  checkSubmissionStatus = 1;
  
  displayedColumns: string[] = ["Sr",'name' ,"doctype","Action"];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayDocuments = []

  sortdocuments = []


  documentData : any = {
    documentName : null,
    documentType : null
  }


  editDoc(e)
  {
    this.checkSubmissionStatus = 2;
    this.btnName = 'Update Document'

    console.log(e["documentName"])

    this.documentData.documentName = e["documentName"];
    this.documentData.documentId = e["documentId"];
    this.documentData.documentType = e["documentType"]

    console.log(this.documentData)

    
  }

  delDoc(e)
  {
    console.log(e["documentId"])
    this.UserService.delDocDetails(e["documentId"])

        .then((result) => {
          
    
         })
        .catch((err) => {
          console.log(err);
    
         
        });
  }


  submit()
  {

    if(this.checkSubmissionStatus == 1)
    {
      console.log(this.documentData)

      this.UserService.createMasterdocument(this.documentData)
      .then((result) => {})
      .catch((err) => {
        console.log(err);
    
      });
    }
    else if(this.checkSubmissionStatus == 2)
    {
      this.UserService.updateDocDetails(this.documentData)
    .then((result) => {})

    .catch((err) => {
      console.log(err);

      });
    }
   
    
    
  }

   
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public loading: boolean;


  ngOnInit(): void {

    this.loading = true;
    
    this.UserService.getMasterDocDetails().subscribe(data => {
      let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];


        for(var d of getCountArray)
        {
          this.displayDocuments.push({"documentName" : d["documentName"], "documentId" : d["documentId"], "documentType" : d["documentType"]})
        }

        this.sortdocuments = this.displayDocuments.reverse();

        this.dataSource = new MatTableDataSource(this.sortdocuments);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.loading  = false;
    })


  }

}
