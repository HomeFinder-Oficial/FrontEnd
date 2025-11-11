import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    CommonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './property-detail.html',
  styleUrls: ['./property-detail.css']
})
export class PropertyDetail {
  @Input() property!: {
  value: string;
  name: string;
  address: string;
  image: string;
  rooms: number;
  baths: number;
  area: number;
  isPopular?: boolean;
  isFavorite?: boolean;
};
  @Input() displayDetail: boolean = false;
  @Output() displayDetailChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  activeTab: 'general' | 'reviews' | 'about' = 'general';
  showReviews = false;

  // Inputs adicionales
  @Input() description = 'Una oportunidad única para vivir en una casa llena de carácter y calidez.';
  @Input() contactButtonText = 'Contactar';
  @Input() footerTitle = 'Información adicional';
  @Input() footerAddress = '';

  // Datos reseñas
  reviews = [
    { user: 'Juan', rating: 5, comment: 'Excelente propiedad, muy cómoda y bien ubicada.' },
    { user: 'María', rating: 4, comment: 'Muy buena atención y limpieza, recomendable.' },
    { user: 'Carlos', rating: 3, comment: 'Está bien, pero el área del baño es pequeña.' }
  ];

  // Control del diálogo de contacto
  displayContactForm = false;

  // Datos del formulario
  contactData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(
    private sanitizer: DomSanitizer,
    private messageService: MessageService
  ) {}

  // Mostrar el formulario de contacto
  contact() {
    this.displayContactForm = true;
  }

  // Enviar el formulario
  submitContactForm() {
    if (!this.contactData.name || !this.contactData.email || !this.contactData.message) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Por favor llena todos los campos antes de enviar.'
      });
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Mensaje enviado',
      detail: 'Gracias por contactarnos. Te responderemos pronto.'
    });

    this.displayContactForm = false;
    this.contactData = { name: '', email: '', message: '' };
  }

  closeContactForm() {
    this.displayContactForm = false;
  }

  closeDetail() {
    this.displayDetail = false;
    this.displayDetailChange.emit(false);
  }


  onDialogHide() {
    this.displayDetail = false;
    this.displayDetailChange.emit(false);
  }

  toggleReviews() {
    this.showReviews = !this.showReviews;
  }

  toggleFavorite() {
    if (this.property) {
      this.property.isFavorite = !this.property.isFavorite;
    }
  }

  googleMapUrl(): SafeResourceUrl {
    const address = this.footerAddress || this.property?.address || '';
    const query = encodeURIComponent(address);
    const url = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getStarsArray(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, i) => i < rating);
  }
}
