import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
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
import { ConfirmationService, MessageService } from 'primeng/api';
import { PropertiesService } from '../../../../core/services/properties/properties.service';
import { ImageUtilsService } from '../../../../core/services/image-utils/image-utils.service';
import { CompanyInfo } from '../../../../shared/constants/company.constants';
import { Property } from '../../../../shared/interfaces/property.interface';


@Component({
  standalone: true,
  selector: 'app-properties-dashboard',
  imports: [
    CommonModule, 
    FormsModule, 
    TableModule, 
    ToolbarModule, 
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
    TextareaModule
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

  properties: Property[] = [];
  selectedProperty: any = null;
  dialogMode: 'view' | 'edit' | 'create' = 'view';
  displayDialog: boolean = false;
  propertyDialog: any;
  selectedImageFile: File | null = null;

  // Exportation related properties
  public readonly Company = CompanyInfo; // This allows Company.NAME to be used in the HTML
  logoBase64: string = '';
  companyName: string = CompanyInfo.NAME;
  reportTitle: string = 'properties list';
  userName: string = 'Nombre del Usuario'; //TASK: Use localStorage service o JWT service to get the current company or user information
  
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
        console.log('Obtained properties:', data);
        //this.properties = data;
        this.messageService.add({ // <-- Replace Swal
          severity: 'success',
          summary: 'Éxito',
          detail: 'Propiedades cargadas correctamente',
        });
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
    this.selectedProperty = { ...property };
    this.dialogMode = 'view';
    this.propertyDialog = true;
  }

  editProperty(property: Property): void {
    this.selectedProperty = { ...property };
    this.dialogMode = 'edit';
    this.propertyDialog = true;
  }

  createProperty(): void {
    this.selectedProperty = {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      image: '',
      status: true,
    };
    this.dialogMode = 'create';
    this.propertyDialog = true;
  }

  savePropertyChanges(): void {
    if (!this.selectedProperty) return;
    
    const propertyData = {
      storeId: this.selectedProperty.storeId = 2,
      categoryId: this.selectedProperty.categoryId = 1,
      userId: 7,
      name: this.selectedProperty.name,
      description: this.selectedProperty.description,
      price: this.selectedProperty.price,
      stock: this.selectedProperty.stock,
      url: this.selectedProperty.url || '',
      ratingRate: this.selectedProperty.ratingRate,
      ratingCount: this.selectedProperty.ratingCount,
      status: true
    };

    const transformedData = {
      store: { id: this.selectedProperty.storeId },
      category: { id: this.selectedProperty.categoryId },
      user: { id: this.selectedProperty.userId },
      name: this.selectedProperty.name,
      description: this.selectedProperty.description,
      price: this.selectedProperty.price,
      stock: this.selectedProperty.stock,
      url: this.selectedProperty.url,
      ratingRate: this.selectedProperty.ratingRate,
      ratingCount: this.selectedProperty.ratingCount,
      status: this.selectedProperty.status
    };

    const formData = new FormData();
    console.log('Creating property with formData');
    const jsonBlob = new Blob([JSON.stringify(propertyData)], { type: 'application/json' });
    formData.append('property', jsonBlob);

    if (this.selectedImageFile) {
      formData.append('file', this.selectedImageFile);
    }
  
    formData.forEach((value, key) => {
      console.log('KEY:', key);
      if (value instanceof Blob) {
        value.text().then((text) => console.log('BLOB VALUE:', text));
      } else {
        console.log('VALUE:', value);
      }
    });
  
    if (this.dialogMode === 'create') {
      this.propertiesService.createProperty(formData).subscribe({
        next: (data) => {
          console.log('Propiedad creada:', data);
          this.properties.push(data);
          this.displayDialog = false; // <-- Close the dialog
          this.messageService.add({ // <-- Replace Swal
            severity: 'success',
            summary: 'Éxito',
            detail: 'Propiedad creada correctamente',
          });
          this.selectedImageFile = null;
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({ // <-- Reemplaza Swal
            severity: 'error',
            summary: 'Error',
            detail: err.error?.message || 'Error al crear la propiedad',
          });
        },
      });
    } else if (this.dialogMode === 'edit' && this.selectedProperty.id) {
      this.propertiesService.updateProperty(this.selectedProperty.id, transformedData).subscribe({
        next: (data) => {
          console.log('Propiedad actualizada:', data);
          const index = this.properties.findIndex((p) => p.id === data.id);
          if (index !== -1) this.properties[index] = data;
          this.displayDialog = false;
            this.messageService.add({ // <-- Reemplaza Swal
              severity: 'success',
              summary: 'Éxito',
              detail: 'Propiedad actualizada correctamente',
            });
          this.selectedImageFile = null;
        },
        error: (err) => {
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

  handleImageUpload(event: any): void {
    const file = event.files[0];
    if (file) {
      this.selectedImageFile = file;
      console.log('Image loaded:', file);

      // Load preview
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedProperty.url = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  exportPdf(table: any): void {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new (jsPDF as any).default('l', 'pt', 'a4'); // Landscape
        
        // Define the columns you DO want to export
        const exportColumns = [
          { title: 'Nombre', dataKey: 'name' },
          { title: 'Descripción', dataKey: 'description' },
          { title: 'Precio', dataKey: 'price' },
          { title: 'Inventario', dataKey: 'stock' },
          { title: 'Estado', dataKey: 'status' },
        ];

        // Map your data from 'table.value' to the format expected by autotable
        const bodyData = table.value.map((property: Property) => ({
          name: property.title,
          description: property.description,
          price: property.price, // Ensure proper cash formatting if needed
          // stock: property.stock,
          status: property.active ? 'Activa' : 'Inactiva',
        }));

        // Add the personalized header (your 'customize' logic adapted)
        doc.autoTable({
          head: [exportColumns.map(c => c.title)],
          body: bodyData.map((row: any) => exportColumns.map(col => row[col.dataKey as keyof typeof row])),
          startY: 70, // leave space for header
          headStyles: { fillColor: [52, 58, 64] },
          styles: { halign: 'center', fontSize: 8 },
        });

        // Title and logo (your logic adapted)
        // doc.addImage(this.logoBase64, 'PNG', 40, 20, 60, 0);
        doc.setFontSize(14);
        doc.text(this.companyName, 110, 35);
        doc.setFontSize(12);
        doc.text(`Reporte: ${this.reportTitle}`, 110, 50);

        doc.save('propiedades.pdf');
      });
    });
  }
  
  hideDialog(): void {
    this.propertyDialog = false;
  }

  showDialog(): void {
    this.propertyDialog = true;
  }
}
