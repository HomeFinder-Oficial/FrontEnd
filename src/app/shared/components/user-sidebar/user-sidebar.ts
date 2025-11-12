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
    // Lista de teclas prohibidas: punto, coma, guion/menos, e (notación científica)
    const invalidChars = ['.', ',', '-', '+', 'e', 'E'];
    
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  }

  onSubmit(form: NgForm) {
    const ubicationInput: string = form.value.ubicationInput;
    const priceInput: number = form.value.priceInput;
    const squareMetersInput: number = form.value.squareMetersInput;
    const minInput: number = form.value.minInput;
    const maxInput: number = form.value.maxInput;
    const roomsInput: number = form.value.roomsInput;
    const bathroomsInput: number = form.value.bathroomsInput;

    const payload = {
      ubicationInput,
      ubicationOptions: this.selectedUbications,
      ...form.value,
      priceInput,
      squareMetersInput,
      minInput,
      maxInput,
      roomsInput,
      bathroomsInput
    };

    console.log('Payload enviado:', payload);
  }

  clearInput(control: any) {
    // Limpiamos el modelo y marcamos el control como pristine/touched apropiadamente
    control.reset('');
  }

  resetAll(event?: Event) {
    event?.preventDefault();
    // Resetea el formulario completo
    this.form?.resetForm();
    // Asegura limpiar el array de ubicaciones seleccionadas
    this.selectedUbications = [];
  }
}
