import { Component, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CardModule, ButtonModule, TabsModule, CheckboxModule, FormsModule],
  templateUrl: './property-detail.html',
  styleUrls: ['./property-detail.css']
})
export class PropertyDetailComponent {

  constructor(private sanitizer: DomSanitizer) {}

  title = input<string>('St. Crystal');
  address = input<string>('210 US Highway, Highland Lake, FL');
  description = input<string>('Lorem ipsum is simply dummy text.');
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
  googleMapUrl(): SafeResourceUrl {
    const query = encodeURIComponent(this.address());
    const url = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
