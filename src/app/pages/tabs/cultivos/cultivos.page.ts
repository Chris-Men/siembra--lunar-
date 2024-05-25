
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cultivos',
  templateUrl: './cultivos.page.html',
  styleUrls: ['./cultivos.page.scss'],
})
export class CultivosPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

// Método para redirigir a la página de frutos
  verFrutos() {
    this.router.navigateByUrl('/tabs/cultivos/frutos');
  }
 // Método para redirigir a la página de hortalizas
  verHortalizas() {
    this.router.navigateByUrl('/tabs/cultivos/hortalizas');
  }
}
