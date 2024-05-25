import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  showAlert: boolean = true; // Variable para controlar la visibilidad de la alerta
  selectedOption: string = ''; // Variable para almacenar la opción seleccionada

  constructor(private router: Router) {}

  // Método para ocultar la alerta
  hideAlert() {
    this.showAlert = false;
  }

  // Método para navegar a la opción seleccionada
  navigate(option: string) {
    if (option) {
      this.selectedOption = option; // Almacena la opción seleccionada
      this.router.navigate(['/tabs/' + option]); // Navega a la página correspondiente a la opción seleccionada
    }
  }

  // Manejador de eventos para el clic en el documento
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    this.hideAlert(); // Oculta la alerta cuando se hace clic en cualquier parte del documento
  }
}
