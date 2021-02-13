
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Country } from '../country';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {

  // class variables
  country: Country;
  appComponent: AppComponent;

  // injecting country services class
  constructor(private countryService: CountryService) {}

  ngOnInit(): void {  }

  // retrieving form data and pass data to backend via service class 
  onAddCountry(addForm: NgForm): void {
    this.countryService.addCountry(addForm.value).subscribe(
      (response: Country) => {
        // succes msg
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
