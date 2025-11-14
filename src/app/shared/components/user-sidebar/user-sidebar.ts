import { Component, ViewChild } from '@angular/core';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, NgForm } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-user-sidebar',
  imports: [
    IconFieldModule,
    InputIconModule,
    InputNumberModule,
    Button,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    SliderModule
  ],
  templateUrl: './user-sidebar.html',
  styleUrl: './user-sidebar.css',
})
export class UserSidebar {
  @ViewChild('form') form!: NgForm;
  // Almacena las ubicaciones seleccionadas en los checkboxes
  selectedUbications: string[] = [];

  userInfo = {
    name: 'Juan Hoyos',
    role: 'Administrador',
    avatar: '../../../../assets/fotos/avatar.png',
  };



  onKeyDown(event: KeyboardEvent): void {
    const invalidChars = ['.', ',', '-', '+', 'e', 'E'];
    
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  }

  onSubmit(form: NgForm) {
    const ubicationInput: string = form.value.ubicationInput;
    const priceInput: number = form.value.priceInput;
    const squareMetersInput: number = form.value.squareMetersInput;
    const minInputPrice: number = form.value.minInputPrice;
    const maxInputPrice: number = form.value.maxInputPrice;
    const minInputMeters: number = form.value.minInputMeters;
    const maxInputMeters: number = form.value.maxInputMeters;
    const roomsInput: number = form.value.roomsInput;
    const bathroomsInput: number = form.value.bathroomsInput;

    const payload = {
      ubicationInput,
      ubicationOptions: this.selectedUbications,
      ...form.value,
      priceInput,
      squareMetersInput,
      minInputPrice,
      maxInputPrice,
      minInputMeters,
      maxInputMeters,
      roomsInput,
      bathroomsInput
    };

    console.log('Payload enviado:', payload);
  }

  clearInput(control: any) {
    control.reset('');
  }

  resetAll(event?: Event) {
    event?.preventDefault();
    this.form?.resetForm();
    this.selectedUbications = [];
  }
}
