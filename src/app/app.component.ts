import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Country } from './country';
import { CountryService } from './country.service';
import {MatDialog} from '@angular/material/dialog';
import { AddCountryComponent } from './add-country/add-country.component';
import { UpdateCountryComponent } from './update-country/update-country.component';
import { DeleteCountryComponent } from './delete-country/delete-country.component';
import { DeleteAllCountriesComponent } from './delete-all-countries/delete-all-countries.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // class level variables
  public countries: Country[];

  // injecting service class
  constructor(private countryService: CountryService, public dialog: MatDialog) {}

  //this will executes when component mounts
  ngOnInit() {
    this.getCountries();
  }

  // get data of all the countries
  public getCountries(): void {
    this.countryService.getAllCountries().subscribe(
      (response: Country[]) => {
        this.countries = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  // listening to onclick event of add country button
  addCountry() {
    const dialogRef = this.dialog.open(AddCountryComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getCountries();
    });
  }

   // listening to onclick event of update country button
  updateCountry(countryData) {
    const dialogRef = this.dialog.open(UpdateCountryComponent, {
      data: { country: countryData }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCountries();
    });
  }

   // listening to onclick event of delete country button
  deleteCountry(countryData: Country) {
    const dialogRef = this.dialog.open(DeleteCountryComponent, {
      data: { country: countryData }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCountries();
    });
  }

  // search function
  public searchCountry(key: string): void {
    const results: Country[] = [];
    // iterating through all the available countries
    for (const country of this.countries) {
      // checking whether name, president or capital has the same charactor sequence as the key
      if (country.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || country.president.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || country.capital.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(country);
      }
    }
    // assigning filtered results to the class variable
    this.countries = results;
    // if there is no any results all the countries will be displayed
    if (results.length === 0 || !key) {
      this.getCountries();
    }
  }

    // listening to onclick event of delete all button
    deleteAllCountry() {
      const dialogRef = this.dialog.open(DeleteAllCountriesComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.getCountries();
      });
    }

}
