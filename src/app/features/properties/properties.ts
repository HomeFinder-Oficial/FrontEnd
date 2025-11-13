import { Component } from '@angular/core';

import { CapsuleButton } from '../../shared/components/capsule-button/capsule-button';
import { PropertiesList } from '../../shared/components/properties-list/properties-list';
import { PropertyDetail } from '../../shared/components/property-detail/property-detail';

@Component({
  selector: 'app-properties',
  imports: [CapsuleButton, PropertyDetail],
  templateUrl: './properties.html',
  styleUrl: './properties.css',
})

export class Properties {
  //
}
