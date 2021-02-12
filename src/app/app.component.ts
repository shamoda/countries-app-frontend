import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Country } from './country';
import { CountryService } from './country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // class level variables
  public countries: Country[];

  // injecting service class
  constructor(private countryService: CountryService) {}

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

}
