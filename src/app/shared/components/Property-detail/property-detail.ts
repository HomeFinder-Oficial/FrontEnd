
import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CardModule, ButtonModule, DividerModule, CheckboxModule, FormsModule],
  templateUrl: './property-detail.html',
  styleUrls: ['./property-detail.css']
})
export class PropertyDetailComponent {

  title = input<string>('St. Crystal');
  address = input<string>('210 US Highway, Highland Lake, FL');
  description = input<string>('Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1960s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.');
  bedrooms = input<number>(2);
  bathrooms = input<number>(1);
  area = input<string>('6x7.5 m²');
  contactButtonText = input<string>('Contact');
  footerTitle = input<string>('Manipul Ridge Villa');
  footerAddress = input<string>('400 Thames Jakarta, Indonesia');

  bedroomChecked = true;
  bathroomChecked = true;
  areaChecked = true;

  contact() {
    console.log('Contact button clicked');
  }
}