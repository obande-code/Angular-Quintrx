import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/APIs/user/user.service';
import { AgreementdocumentsComponent } from 'src/app/modals/agreementdocuments/agreementdocuments.component';
import * as html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf';





@Component({
  selector: 'app-mytemplates',
  templateUrl: './mytemplates.component.html',
  styleUrls: ['./mytemplates.component.scss']
})
export class MytemplatesComponent implements OnInit {

  constructor(private UserService : UserService,  private modal : NgbModal) { }

  showErr = false;
  errMsg;
  public loading : boolean;


  displayedColumns: string[] = ['name' ,"Action", "download"];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayDocuments = []


  
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  viewDoc(e)
  {
    this.showErr = false
    console.log(e)


    this.UserService.pagestatus = 70;
    this.UserService.documentId = e["documentId"]

    this.modal.open(AgreementdocumentsComponent, {
      size: 'xl',


    });
  }

  downloadDoc(e)
  {
    this.showErr = false
       console.log(e["documentId"])

     this.UserService.getDocTemplate(e["documentId"]).subscribe((data) => {
      //var blob
     // var blob = new Blob([data], {type: 'application/pdf'});
    if(!data)
    {
      this.errMsg = "Unable to download document. Document is not available"
      this.showErr = true
    }
    else
    {
      this.showErr = false
      var binaryData = [];
      binaryData.push(data);
      var downloadURL = window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}));
    //  window.open(downloadURL, '_blank')
   
      var link = document.createElement('a');
     
     
      var doc = new jsPDF();
      doc.fromHTML(data);
      doc.save(e["documentName"]+'.pdf');

     
     
     // link.href = downloadURL;
      //window.open(link.innerHTML, '_blank')
     //  link.download = e["documentName"]+'.pdf';
     // link.click();

    }
   

     


    });


   

  }

  ngOnInit(): void {


    this.loading = true;
    
    this.UserService.getMasterDocDetails().subscribe(data => {
      let toStringCount = JSON.stringify(data);
        const parseCount = JSON.parse(toStringCount);
        var getCountArray = parseCount["responseObject"];

        for(var d of getCountArray)
        {

          if(d["documentLocation"] == "")
          {
            this.displayDocuments.push({"documentName" : d["documentName"], "documentId" : d["documentId"], "documentType" : d["documentType"]})
          }
          else
          {
            this.displayDocuments.push({"documentName" : d["documentAlias"], "documentId" : d["documentId"], "documentType" : d["documentType"]})

          }

         
        }
        
        this.dataSource = new MatTableDataSource(this.displayDocuments);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.loading  = false;
    })
  }

}
