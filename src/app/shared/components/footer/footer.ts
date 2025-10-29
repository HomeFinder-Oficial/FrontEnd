import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, MenubarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class Footer {

}
