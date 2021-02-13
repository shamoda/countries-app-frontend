import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '../country';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-update-country',
  templateUrl: './update-country.component.html',
  styleUrls: ['./update-country.component.css']
})
export class UpdateCountryComponent implements OnInit {

  // class variables
  country: Country;

  // injecting service class and catch data from the previous component and assign it to class variable
  constructor(private countryService: CountryService, @Inject(MAT_DIALOG_DATA) public data: any) { this.country = data.country }

  ngOnInit(): void {
  }

  // sending put request with country object via service class
  onUpdateCountry(country: Country): void {
    this.countryService.updateCountry(country).subscribe(
      (response: Country) => {
        // success msg 
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
