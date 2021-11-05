import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationService } from 'src/app/APIs/user/authentication.service';
import { UserService } from 'src/app/APIs/user/user.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AgreementdocumentsComponent } from 'src/app/modals/agreementdocuments/agreementdocuments.component';

@Component({
  selector: 'app-mydocuments',
  templateUrl: './mydocuments.component.html',
  styleUrls: ['./mydocuments.component.scss']
})
export class MydocumentsComponent implements OnInit {
  public loading: boolean;
  constructor(private UserService : UserService, private auth: AuthenticationService, private modal : NgbModal,
              private ngxService: NgxUiLoaderService) { }

  displayedColumns: string[] = ['name' ,"Action"];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayDocuments = []


  errMsg = "Legal team must sign MSA before viewing"
  showErr : boolean = false;
  viewDoc(e)
  {
    if (e["name"] == "MSA.pdf" && e["status"] == 1){
      this.showErr = true;

    }
    else {
      console.log(this.displayDocuments);
      console.log(e)
      this.UserService.documentUserRelId = e["documentUserRelId"];
      this.UserService.pagestatus = 1;

      this.modal.open(AgreementdocumentsComponent, {
        size: 'xl',

      });
      this.showErr = false;
    }


  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit(): void {
    this.loading = true;
    //this.ngxService.startBackground();



    console.log(this.UserService.userEmail)
    console.log(this.auth.userIdd)

    var x  = this.auth.getAuthFromLocalStorage();
    console.log(x)

    var email = localStorage.getItem('USER_EMAIL');
    //console.log(localStorage.getItem('USER_EMAIL'))
    var getUserId;

    this.auth.getUserGroupRelationDetailByEmail(email).subscribe(x => {
      console.log(x["responseObject"]["userId"])

      if(this.UserService.adminsideAgreeCheck == 1)
      {
        getUserId = this.UserService.getuserIdFromAdmin;
      }
      else
      {
        getUserId = x["responseObject"]["userId"]
      }


      this.UserService.getGetDocumentInofrmation(getUserId).subscribe(data => {


        console.log(data)
        let code = JSON.stringify(data);
        const obj = JSON.parse(code);
        var x = obj["responseObject"]

        console.log(getUserId)
        for(var d of x)
        {
         // console.log(d)

          this.displayDocuments.push({"name" : d["documentName"], "documentUserRelId" : d["documentUserRelId"], "documentId" : d["documentId"], "status" : d["status"]})
        }

        this.dataSource = new MatTableDataSource(this.displayDocuments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.loading = false;



      })

    })






  }

}
