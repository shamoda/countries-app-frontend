import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Country } from './country';
import { CountryService } from './country.service';
import {MatDialog} from '@angular/material/dialog';
import { AddCountryComponent } from './add-country/add-country.component';
import { UpdateCountryComponent } from './update-country/update-country.component';
import { DeleteCountryComponent } from './delete-country/delete-country.component';


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

  addCountry() {
    const dialogRef = this.dialog.open(AddCountryComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getCountries();
    });
  }

  updateCountry(countryData) {
    const dialogRef = this.dialog.open(UpdateCountryComponent, {
      data: { country: countryData }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCountries();
    });
  }

  deleteCountry(countryData: Country) {
    const dialogRef = this.dialog.open(DeleteCountryComponent, {
      data: { country: countryData }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCountries();
    });
  }

  public searchCountry(key: string): void {
    const results: Country[] = [];
    for (const country of this.countries) {
      if (country.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || country.president.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || country.capital.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(country);
      }
    }
    this.countries = results;
    if (results.length === 0 || !key) {
      this.getCountries();
    }
  }

  // public openDialog(country: Country, mode: string): void {
  //   const container = document.getElementById('main-container');
  //   const button = document.createElement('button');
  //   button.type = 'button';
  //   button.style.display = 'none';
  //   button.setAttribute('data-toggle', 'modal');
  //   if(mode == 'add') {
  //     button.setAttribute('data-target', '#addCountry');
  //   }
  //   if(mode == 'edit') {
  //     button.setAttribute('data-target', '#editCountry');
  //   }
  //   if(mode == 'delete') {
  //     button.setAttribute('data-target', '#deleteCountry');
  //   }
  //   container.appendChild(button);
  //   button.click();
  // }


}
