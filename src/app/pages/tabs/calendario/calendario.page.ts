import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit, OnDestroy {
  moon: any;
  resizeListener: any;

  constructor() {}

  ngOnInit() {
    // Cargar las fases lunares para el mes actual al iniciar el componente
    this.loadMoonPhases(
      {
        lang: 'es', // Configurando el idioma a español
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        size: '80%',
        lightColor: '#c4eb6b',
        shadeColor: '#333',
        texturize: true,
      },
      this.renderCalendar.bind(this)
    );

    // Agregar el listener para el evento de redimensionamiento
    this.resizeListener = () => {
      this.renderCalendar(this.moon);
    };
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    // Remover el listener cuando el componente se destruya
    window.removeEventListener('resize', this.resizeListener);
  }
 // Función para cargar las fases lunares desde la API
  loadMoonPhases(obj: any, callback: (moon: any) => void) {
    const gets: string[] = [];
    for (const i in obj) {
      gets.push(i + '=' + encodeURIComponent(obj[i]));
    }
    gets.push(
      'LDZ=' +
        Math.floor(new Date(obj.year, obj.month - 1, 1).getTime() / 1000)
    );
    const url = 'https://www.icalendar37.net/lunar/api/?' + gets.join('&');
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        callback(JSON.parse(xmlhttp.responseText));
      }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  }
 // Función para renderizar el calendario con las fases lunares
  renderCalendar(moon: any) {
    this.moon = moon;
    const containsCalendar = document.getElementById('ex3') as HTMLElement;
    if (!containsCalendar) return;

    // Días de la semana en español
    let daysOfWeek = [ 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    let html = '';
    const first_day_week_sunday = false;
    let inc = 0;
    if (first_day_week_sunday) {
      inc = 1;
      moon.nameDay.unshift(moon.nameDay.pop());
    }
    const empty_initial_boxes = Number(moon.phase[1].dayWeek) + inc;
    const number_days_month = Number(moon.daysMonth);
    const total_boxes = Math.ceil((empty_initial_boxes + number_days_month) / 7) * 7;

    for (let i = 0; i < 7; i++) {
      let dayStyle = `
        background-color: #eb882c;
        color: #1903df;
        padding: 5px;
        border: 2px solid #ccc;
        border-radius: 5px;
        margin-bottom: 5px;
        text-align: center;
        font-weight: bold;
        font-size: 0.6rem;
      `;
      if (window.innerWidth <= 768) {
        dayStyle += `
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `;
      }
      html += `<div style="${dayStyle}">${daysOfWeek[i]}</div>\n`;
    }

    html += '';
    containsCalendar.innerHTML = html;

    for (let i = 0; i < total_boxes; i++) {
      const day = i - empty_initial_boxes;
      const box = document.createElement('DIV');
      box.className = 'day_box';
      `
        display: inline-block;
        width: 100%;
        height: 60px; /* Reduce la altura */
        vertical-align: top;
        border: 1px solid #ccc;
        box-sizing: border-box;
        text-align: center;
        padding: 5px; /* Reduce el relleno */
      `;
      if (day >= 0 && day < number_days_month) {
        const lunar_day = day + 1;
        const phaseName = moon.phase[lunar_day].phaseName; // Nombre de la fase lunar
        if (
          moon.year == new Date().getFullYear() &&
          moon.month == new Date().getMonth() + 1 &&
          lunar_day == new Date().getDate()
        ) {
          box.id = 'isToDay';
          box.style.backgroundColor = '#FFFFE0'; // Cambia el fondo del día actual
        }
        box.innerHTML = `
          <div>
            <span>${lunar_day}</span>
            <div>${moon.phase[lunar_day].svg}</div>
            <div style="font-size: 0.5rem; color: #333;"><strong>${phaseName}</strong></div> <!-- Mostrar el nombre de la fase lunar en negrita y color muy oscuro -->
          </div>
        `;
      }
      containsCalendar.appendChild(box);
    }
    
    this.setupNavigationButtons();
  }
// Función para configurar los botones de navegación del calendario
  setupNavigationButtons() {
    document.querySelectorAll('.buttonCalendar').forEach((button) => {
      (button as HTMLElement).onclick = () => {
        const direction = Number((button as HTMLButtonElement).value);
        this.navigateCalendar(direction);
      };
    });
  }
// Función para navegar por el calendario hacia adelante o hacia atrás
  navigateCalendar(direction: number) {
    const date_to_show = new Date(this.moon.year, this.moon.month + direction - 1, 1);
    this.moon.receivedVariables.month = date_to_show.getMonth() + 1;
    this.moon.receivedVariables.year = date_to_show.getFullYear();
    this.loadMoonPhases(this.moon.receivedVariables, this.renderCalendar.bind(this));
  }
}
