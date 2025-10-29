import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, MenubarModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})

export class Footer {

}
