
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

  country: Country;
  appComponent: AppComponent;


  constructor(private countryService: CountryService) {}

  ngOnInit(): void {  }

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
