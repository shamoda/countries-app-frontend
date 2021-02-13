import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-delete-all-countries',
  templateUrl: './delete-all-countries.component.html',
  styleUrls: ['./delete-all-countries.component.css']
})
export class DeleteAllCountriesComponent implements OnInit {

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
  }

  public onDeleteAllCountries() {
    console.log("clicked")
    this.countryService.deleteAllCountries().subscribe(
      (response: void) => {
        // success msg
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
