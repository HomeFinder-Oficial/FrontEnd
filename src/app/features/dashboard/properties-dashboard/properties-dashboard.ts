import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PropertiesService } from '../../../core/services/properties/properties.service';
import { ImageUtilsService } from '../../../core/services/image-utils/image-utils.service';
import { CompanyInfo } from '../../../shared/constants/company.constants';
import { Property } from '../../../shared/interfaces/property.interface';


@Component({
  standalone: true,
  selector: 'app-properties-dashboard',
  imports: [
    CommonModule, 
    FormsModule, 
    TableModule, 
    FileUploadModule, 
    ButtonModule, 
    DialogModule, 
    ConfirmDialogModule, 
    InputNumberModule, 
    IconFieldModule, 
    InputIconModule, 
    TagModule,
    ToastModule,
    InputTextModule,
    TextareaModule,
    SelectModule
  ],
  templateUrl: './properties-dashboard.html',
  styleUrl: './properties-dashboard.css',
  // 2. AÑADIMOS LOS SERVICIOS DE PRIMENG
  providers: [DatePipe, MessageService, ConfirmationService],
})

export class PropertiesDashboard implements OnInit {

  // Injecting services using the inject function
  propertiesService = inject(PropertiesService);
  datePipe = inject(DatePipe);
  messageService = inject(MessageService); // <-- For Toasts (replaces Swal)
  confirmationService = inject(ConfirmationService); // <-- For Confirm (replaces Swal)
  imageUtil = inject(ImageUtilsService);

  properties: Property[] = []; // Array to hold the list of properties
  selectedProperties: Property[] = []; // Array to hold selected properties for deletion
  propertyDetails: Property | null = null; // Storage data for the selected property
  dialogMode: 'view' | 'edit' | 'create' = 'view';
  displayDialog: boolean = false;
  selectedImageFile: File | null = null;

  // Exportation related properties
  public readonly Company = CompanyInfo; // This allows Company.NAME to be used in the HTML
  logoBase64: string = '';
  companyName: string = CompanyInfo.NAME;
  reportTitle: string = 'properties list';
  userName: string = 'Nombre del Usuario'; //TASK: Use localStorage service o JWT service to get the current company or user information

  // Top Bar on Table
  // Property for rows per page options (10, 20, 30, etc.)
  rowsPerPageOptions: number[] = [10, 20, 30, 50];

  // Property to hold the current selection (default 10)
  rows: number = 10;
  
  ngOnInit() {
    // Initialization logic here
    this.getProperties();

    this.imageUtil
    .convertImageToBase64('assets/logos/company-logo.png')
      .then((base64) => {
        this.logoBase64 = base64;
      });
  }

  getProperties(): void {
    this.propertiesService.getPropertiesByPage(1, 100).subscribe({
      next: (data) => {
        this.properties = data?.content || [];
        //this.properties = data;
        console.log('Obtained properties:', data);
      },
      error: (err) => {
        console.error('Error obtaining properties:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las propiedades',
        });
      },
    });
  }

  seeProperty(property: Property): void {
    this.propertyDetails = { ...property }; // Usa la variable separada
    this.dialogMode = 'view';
    this.displayDialog = true; // 👈 AÑADE ESTO para abrir el modal
  }

  editProperty(property: Property): void {
    this.propertyDetails = { ...property }; // Usa la variable separada
    this.dialogMode = 'edit';
    this.displayDialog = true; // 👈 AÑADE ESTO para abrir el modal
  }

  deleteProperty(property: Property): void {
    this.confirmationService.confirm({
      message: `¿Seguro que deseas eliminar a ${property.title}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.propertiesService.deleteProperty(property.id!).subscribe({
          next: () => {
            this.properties = this.properties.filter((p) => p.id !== property.id);
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'La propiedad ha sido eliminada exitosamente',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar la propiedad',
            });
          },
        });
      },
    });
  }

  createProperty(): void {
    this.propertyDetails = {
      id: 0, // or the appropriate default value from backend
      title: '',
      description: '',
      price: 0,
      area_m2: 0,
      rooms: 0,
      bathrooms: 0,
      active: true,
      // ... (any other default fields)
    };
    this.dialogMode = 'create';
    this.displayDialog = true;
  }

  deleteSelectedProperties(): void {
    // Confirms with the user
    this.confirmationService.confirm({
      message: `¿Estás seguro de eliminar las ${this.selectedProperties.length} propiedades seleccionadas?`,
      header: 'Confirmar eliminación múltiple',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        
        // Create an array of observables (API calls)
        const deleteRequests = this.selectedProperties.map(property => 
          this.propertiesService.deleteProperty(property.id!)
        );

        // Use forkJoin to execute them all
        forkJoin(deleteRequests).subscribe({
          next: () => {
            // If all deletions were successful, update the local properties list
            this.properties = this.properties.filter(
              // Filters and keep only those NOT in selectedProperties
              (p) => !this.selectedProperties.some(sp => sp.id === p.id)
            );
            
            this.selectedProperties = [];

            this.messageService.add({
              severity: 'success',
              summary: 'Eliminadas',
              detail: 'Las propiedades seleccionadas han sido eliminadas exitosamente',
            });
          },
          error: (err) => {
            console.error('Error en borrado múltiple:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudieron eliminar las propiedades seleccionadas',
            });
          },
        });
      },
    });
  }

  savePropertyChanges(): void {
    if (!this.propertyDetails) {
      console.error('Error: There is no property selected for saving changes');
      return;
    }
    
    const propertyPayload: Property = {
      id: this.propertyDetails.id,
      title: this.propertyDetails.title,
      description: this.propertyDetails.description,
      price: this.propertyDetails.price,
      area_m2: this.propertyDetails.area_m2,
      rooms: this.propertyDetails.rooms,
      bathrooms: this.propertyDetails.bathrooms,
      active: this.propertyDetails.active,
      // ... (any other specific fields from Property)
    };
    
    // ACTION: Create property
    if (this.dialogMode === 'create') {
      const formData = new FormData();
      console.log('Creating property with formData');
      const jsonBlob = new Blob([JSON.stringify(propertyPayload)], { type: 'application/json' });
      formData.append('property', jsonBlob);

      if (this.selectedImageFile) {
        formData.append('file', this.selectedImageFile);
      }

      // CÓDIGO PARA HACER DEBUG EN CONSOLA
      formData.forEach((value, key) => {
        console.log('KEY:', key);
        if (value instanceof Blob) {
          value.text().then((text) => console.log('BLOB VALUE:', text));
        } else {
          console.log('VALUE:', value);
        }
      });
      // CÓDIGO PARA HACER DEBUG EN CONSOLA
      
      this.propertiesService.createProperty(formData).subscribe({
        next: (newProperty) => {
          console.log('Property created:', newProperty);
          this.properties = [newProperty, ...this.properties];

          this.displayDialog = false; // <-- Close the dialog
          this.messageService.add({ // <-- Replace Swal
            severity: 'success',
            summary: 'Éxito',
            detail: 'Propiedad creada correctamente',
          });
          this.selectedImageFile = null;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.messageService.add({ // <-- Reemplaza Swal
            severity: 'error',
            summary: 'Error',
            detail: err.error?.message || 'Error al crear la propiedad',
          });
        },
      }); // ACTION: Update property
    } else if (this.dialogMode === 'edit' && this.propertyDetails.id) {
      this.propertiesService.updateProperty(propertyPayload.id, propertyPayload).subscribe({
        next: (updatedProperty) => {
          // Update the local properties array
          this.properties = this.properties.map(p => 
            p.id === updatedProperty.id ? updatedProperty : p
          );
          console.log('Property updated:', updatedProperty);
          this.displayDialog = false;
          this.messageService.add({ // <-- Reemplaza Swal
            severity: 'success',
            summary: 'Éxito',
            detail: 'Propiedad actualizada correctamente',
          });
          this.selectedImageFile = null;
          this.propertyDetails = null;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error?.message || 'Error al actualizar la propiedad',
            });
        },
      });
    }
  }

  handleImageUpload(event: any): void {
    const file = event.files[0];
    if (file) {
      this.selectedImageFile = file;
      console.log('Image loaded:', file);

      // Load preview
      const reader = new FileReader();
      reader.onload = () => {
        if (this.propertyDetails) {
          // Asumming 'url' is a field in your Property interface for preview
          //this.propertyDetails.url = reader.result as string; 
        }
      };
      reader.readAsDataURL(file);
    }
  }

  exportPDFDownload(table: any): void {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new (jsPDF as any).default('l', 'pt', 'a4'); // Landscape
        const pageWidth = doc.internal.pageSize.getWidth();
        
        // Define the columns you DO want to export
        const exportColumns = [
          { title: 'ID', dataKey: 'id' },
          { title: 'Título', dataKey: 'title' },
          { title: 'Precio', dataKey: 'price' },
          { title: 'Área (m²)', dataKey: 'area_m2' },
          { title: 'Habitaciones', dataKey: 'rooms' },
          { title: 'Baños', dataKey: 'bathrooms' },
          { title: 'Estado', dataKey: 'active' },
        ];

        const priceFormatter = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0
        });

        // Map your data from 'table.value' to the format expected by autotable
        const bodyData = table.value.map((property: Property) => ({
          id: property.id,
          title: property.title,
          price: priceFormatter.format(property.price), // Usamos el formateador
          area_m2: property.area_m2,
          rooms: property.rooms,
          bathrooms: property.bathrooms,
          active: property.active ? 'Activa' : 'Inactiva',
        }));

        // Personalized Header
        // Add the personalized header (your 'customize' logic adapted)
        doc.addImage(this.logoBase64, 'PNG', 40, 20, 50, 0); // (logo, tipo, x, y, ancho)

        doc.setFontSize(14);
        doc.text(this.companyName, 110, 35);
        doc.setFontSize(12);
        doc.text(`Reporte: ${this.reportTitle}`, 110, 50);

        const footerUserName = this.userName; 
        const footerDateTime = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm') || '';

        doc.autoTable({
          head: [exportColumns.map(c => c.title)],
          body: bodyData.map((row: typeof bodyData[0]) => exportColumns.map(col => row[col.dataKey as keyof typeof row])),
          startY: 70, // leave space for header
          headStyles: { fillColor: [52, 58, 64] },
          styles: { halign: 'center', fontSize: 8 },

          // Title and logo (your logic adapted)
          // doc.addImage(this.logoBase64, 'PNG', 40, 20, 60, 0);
          didDrawPage: (data: any) => {
            const pageCount = doc.internal.getNumberOfPages();
            doc.setFontSize(9);
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 40;

            // Col 1: User
            doc.text(`Generado por: ${footerUserName}`, margin, pageHeight - 15, { 
                align: 'left' 
            });
            // Col 2: Pagination
            const pageText = `Página ${data.pageNumber} de ${pageCount}`;
            doc.text(pageText, pageWidth / 2, pageHeight - 15, { 
                align: 'center' 
            });
            // Col 3: Date
            doc.text(`Fecha: ${footerDateTime}`, pageWidth - margin, pageHeight - 15, { 
                align: 'right' 
            });
          }
        });
        // Save the PDF
        doc.save('propiedades.pdf');
      });
    });
  }

  exportPdfPreview(table: any): void {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new (jsPDF as any).default('l', 'pt', 'a4'); // Landscape
        const pageWidth = doc.internal.pageSize.getWidth();

        // Columnas correctas
        const exportColumns = [
          { title: 'ID', dataKey: 'id' },
          { title: 'Título', dataKey: 'title' },
          { title: 'Precio', dataKey: 'price' },
          { title: 'Área (m²)', dataKey: 'area_m2' },
          { title: 'Habitaciones', dataKey: 'rooms' },
          { title: 'Baños', dataKey: 'bathrooms' },
          { title: 'Estado', dataKey: 'active' },
        ];

        // Formateador de moneda
        const priceFormatter = new Intl.NumberFormat('es-CO', {
          style: 'currency', currency: 'COP', minimumFractionDigits: 0
        });

        // Mapeo de datos correcto
        const bodyData = table.value.map((property: Property) => ({
          id: property.id,
          title: property.title,
          price: priceFormatter.format(property.price),
          area_m2: property.area_m2,
          rooms: property.rooms,
          bathrooms: property.bathrooms,
          active: property.active ? 'Activa' : 'Inactiva',
        }));

        // --- Encabezado Personalizado ---
        doc.addImage(this.logoBase64, 'PNG', 40, 20, 50, 0); 
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(this.companyName, pageWidth / 2, 40, { align: 'center' });
        doc.setFontSize(10);
        doc.setFont(undefined, 'italic');
        doc.text(this.reportTitle, pageWidth - 40, 40, { align: 'right' });

        // --- Footer Personalizado (Variables) ---
        const footerUserName = this.userName; 
        const footerDateTime = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm') || '';

        // --- AutoTable ---
        doc.autoTable({
          head: [exportColumns.map(c => c.title)],
          body: bodyData.map((row: typeof bodyData[0]) => exportColumns.map(col => row[col.dataKey as keyof typeof row])),
          startY: 70, 
          headStyles: { fillColor: [52, 58, 64] },
          styles: { halign: 'center', fontSize: 8 },
          didDrawPage: (data: any) => {
            // ... (Lógica del footer con paginación) ...
            const pageCount = doc.internal.getNumberOfPages();
            doc.setFontSize(9);
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 40;
            doc.text(`Generado por: ${footerUserName}`, margin, pageHeight - 15, { align: 'left' });
            doc.text(`Página ${data.pageNumber} de ${pageCount}`, pageWidth / 2, pageHeight - 15, { align: 'center' });
            doc.text(`Fecha: ${footerDateTime}`, pageWidth - margin, pageHeight - 15, { align: 'right' });
          }
        });

        // (LA ÚNICA DIFERENCIA) Abre en una nueva pestaña
        doc.output('dataurlnewwindow');
      });
    });
  }
  
  hideDialog(): void {
    this.displayDialog = false; // Cierra el modal
    this.propertyDetails = null; // Limpia el objeto del formulario
    this.selectedImageFile = null; // Limpia cualquier archivo de imagen cargado
  }

  showDialog(): void {
    // 1. Usa 'propertyDetails' para el formulario
    this.propertyDetails = {
      id: 0, 
      title: '',
      description: '',
      price: 0,
      area_m2: 0,
      rooms: 0,
      bathrooms: 0,
      active: true,
      //url: 'assets/images/placeholder.png' // Placeholder para la preview
      // ... (complete with your Property interface fields)
    };
    
    this.dialogMode = 'create';
    this.displayDialog = true;
  }

  exportCSV(dt: any): void {
    dt.exportCSV();
  }
}
