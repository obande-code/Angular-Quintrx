import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule, JsonpClientBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class Package {
  constructor(
    public serviceId: number,
    public providerId: number,
    public serviceCost: number,
    public serviceName: string,
    public servicePrice: number,
    public status: number,
    ){}
}

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
})

export class PackageComponent implements OnInit {
  public submitted = false;
  public form: FormGroup;
  constructor(
    private httpClient: HttpClient,
    private builder: FormBuilder,
    private activeRoute: ActivatedRoute,

  ) {
    this.form = this.builder.group({
      reference_amount_1: [''],
      reference_amount_2: [''],
      total_amount: [''],
    });
  }




  ngOnInit(): void {
    this.getPackages();
    this.savedValues = JSON.parse(localStorage.getItem("savedForm") || '')
  }

  onSubmit() {}

  onKey(type: string) {
    this.form.controls['total_amount'].setValue(
      Number(this.form.value.reference_amount_1) +
        Number(this.form.value.reference_amount_2)
    );
  }

  increase(type: string) {
    switch (type) {
      case 'reference_amount_1':

      this.form.controls['reference_amount_1'].setValue(
          Number(this.form.value.reference_amount_1) + 1
        );

        break;
      case 'reference_amount_2':
        this.form.controls['reference_amount_2'].setValue(
          Number(this.form.value.reference_amount_2) + 1
        );

        break;
      default:

    }
    this.form.controls['total_amount'].setValue(
      Number(this.form.value.reference_amount_1) +
        Number(this.form.value.reference_amount_2)
    );
  }

  packages = [];
  names = [];
  packageId = '';
  searchedPackageName = '';


  getPackages(){
    return this.httpClient.get<any>(environment.api_url  +'/findAllPackage').subscribe(
      response => {
        const packagesArray = response.responseObject;
        this.packages = packagesArray;
        console.log(response);
        const names = []
        packagesArray.forEach((p: any) => {
          names.push({"name":p['packageName'],"price":p['price'], "id":p[0]})
        })
        this.names = names;
      })


  }






  handleSearch() {
      console.log('this.packageId', this.packageId);
      return this.httpClient.get<any>(`http://vetzu-java-dev.azurewebsites.net/findPackageById/${this.packageId}`).subscribe(
        response => {
          console.log('find package', response);


          if (response.responseCode === 511) {
            this.searchedPackageName = 'No Package Found';
          }
          if (response.responseCode === 321) {
            this.searchedPackageName = response.responseObject.packageName;
          }
        })
  }
  savedValues = null;

  get name() {
    if (!this.savedValues) {
      return ""
    }
    const { firstName, lastName, middleName } = this.savedValues;
    return `${firstName} ${middleName} ${lastName}`
  }

  get address() {
    if (!this.savedValues) {
      return ""
    }
    const { houseApt, streetAddress, city, state, zipcode  } = this.savedValues;
    return `${houseApt} ${streetAddress} ${city}, ${state} ${zipcode}`
  }
}
