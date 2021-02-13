import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '../country';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-delete-country',
  templateUrl: './delete-country.component.html',
  styleUrls: ['./delete-country.component.css']
})
export class DeleteCountryComponent implements OnInit {

  // class variables
  country: Country;

  // injecting service class and catch data from the previous component and assign it to class variable
  constructor(private countryService: CountryService, @Inject(MAT_DIALOG_DATA) public data: any) { this.country = data.country }

  ngOnInit(): void {
  }

  // send delete request to backend with country id via service class
  onDeleteCountry(): void {
    console.log("clicked")
    this.countryService.deleteCountry(this.country.id).subscribe(
      (response: void) => {
        // success msg
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
