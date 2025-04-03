import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

interface CitaType {
  id: string;
  label: string;
  color: string;
}
interface NuevaCita {
  tipo: string;
  nombre: string;
}

interface CitaSeleccionada {
  id?: string;
  nombre: string;
  tipo: string;
  fecha: string;
  hora: string;
  costo: number;
}

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, FullCalendarModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  tiposCita: CitaType[] = [
    { id: 'limpieza', label: 'Limpieza Dental', color: '#007AFF' },    // Azul Apple
    { id: 'revision', label: 'Revisión General', color: '#5856D6' },    // Púrpura Apple
    { id: 'emergencia', label: 'Emergencia', color: '#FF2D55' },        // Rosa Apple
    { id: 'ortodonia', label: 'Ortodoncia', color: '#34C759' },         // Verde Apple
    { id: 'blanqueamiento', label: 'Blanqueamiento', color: '#FF9500' } // Naranja Apple
  ];
  mostrarSelector = false;
  nuevaCita: NuevaCita = { tipo: '', nombre: '' };
  seleccionTemporal: any;
  currentDate = new Date();
  months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  years = Array.from(new Array(10), (val, index) => new Date().getFullYear() + index);
  selectedMonth: number;
  selectedYear: number;

  mostrarDetalles = false;
  citaSeleccionada: CitaSeleccionada = {
    nombre: '',
    tipo: '',
    fecha: '',
    hora: '',
    costo: 0
  };
  eventoSeleccionado: any = null;

  constructor() {
    const today = new Date();
    this.selectedMonth = today.getMonth();
    this.selectedYear = today.getFullYear();
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: 'es',
    headerToolbar: false,
    height: '100%',
    dayMaxEvents: true,
    weekends: true,
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
      hour12: false
    },
    eventDisplay: 'block',
    eventContent: this.renderEventContent.bind(this),
    views: {
      dayGridMonth: {
        dayMaxEvents: window.innerWidth < 768 ? 2 : 3,
        eventMinHeight: window.innerWidth < 768 ? 20 : 24,
      }
    },
    events: [],
    eventDidMount: (info) => {
      info.el.style.backgroundColor = info.event.backgroundColor;
    }
  };

  events: any[] = [];

  ngOnInit() {

  }

  renderEventContent(eventInfo: any) {
    const isMobile = window.innerWidth < 768;

    // Formatear hora para móviles de manera más compacta
    const timeStr = eventInfo.timeText ?
      new Date(eventInfo.event.start).toLocaleTimeString('es', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: isMobile
      }).replace(/\s/g, '').toLowerCase() : '';

    // Acortar el tipo de cita para móviles
    const typeLabel = isMobile ?
      eventInfo.event.extendedProps.tipo.split(' ')[0] :
      eventInfo.event.extendedProps.tipo;

    // Renderizar diferente para móviles
    if (isMobile) {
      return {
        html: `
          <div class="event-content">
            <div class="event-info">
              <div class="title">${eventInfo.event.title}</div>
              <div class="event-details mobile">
                <span class="time">${timeStr}</span>
              </div>
            </div>
          </div>
        `
      };
    }

    // Versión desktop
    return {
      html: `
        <div class="event-content">
          <div class="event-info">
            <div class="title">${eventInfo.event.title}</div>
            <div class="event-details">
              <span class="type">${typeLabel}</span>
              <span class="time">${timeStr}</span>
            </div>
          </div>
        </div>
      `
    };
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const selectedDate = selectInfo.start;
    this.citaSeleccionada = {
      nombre: '',
      tipo: '',
      fecha: selectedDate.toISOString().split('T')[0],
      hora: selectedDate.toTimeString().split(':').slice(0, 2).join(':'),
      costo: 0
    };
    this.mostrarDetalles = true;
    this.eventoSeleccionado = null;
  }

  confirmarCita() {
    const { tipo, nombre } = this.citaSeleccionada;
    if (tipo && nombre) {
      const tipoInfo = this.tiposCita.find(t => t.id === tipo);
      const fechaHora = new Date(`${this.citaSeleccionada.fecha}T${this.citaSeleccionada.hora}`);

      const newEvent = {
        id: this.createEventId(),
        title: nombre,
        start: fechaHora,
        backgroundColor: tipoInfo?.color,
        extendedProps: {
          tipo: tipoInfo?.label,
          costo: this.citaSeleccionada.costo
        }
      };

      const calendarApi = this.getCalendarApi();
      calendarApi.addEvent(newEvent);
      this.events.push(newEvent);
    }
    this.cerrarDetalles();
  }

  cerrarSelector() {
    this.mostrarSelector = false;
    if (this.seleccionTemporal) {
      this.seleccionTemporal.view.calendar.unselect();
    }
  }

  handleEventClick(clickInfo: any) {
    this.eventoSeleccionado = clickInfo.event;
    this.citaSeleccionada = {
      id: clickInfo.event.id,
      nombre: clickInfo.event.title,
      tipo: this.getTipoId(clickInfo.event.extendedProps.tipo),
      fecha: clickInfo.event.start?.toISOString().split('T')[0] || '',
      hora: clickInfo.event.start?.toTimeString().split(':').slice(0, 2).join(':') || '',
      costo: clickInfo.event.extendedProps.costo || 0
    };
    this.mostrarDetalles = true;
  }

  cerrarDetalles() {
    this.mostrarDetalles = false;
    this.eventoSeleccionado = null;
  }

  eliminarCita() {
    if (confirm('¿Está seguro de eliminar esta cita?')) {
      this.eventoSeleccionado?.remove();
      this.cerrarDetalles();
    }
  }

  guardarCambios() {
    if (this.eventoSeleccionado) {
      const tipoInfo = this.tiposCita.find(t => t.id === this.citaSeleccionada.tipo);

      this.eventoSeleccionado.setProp('title', this.citaSeleccionada.nombre);
      this.eventoSeleccionado.setExtendedProp('tipo', tipoInfo?.label);
      this.eventoSeleccionado.setExtendedProp('costo', this.citaSeleccionada.costo);

      const nuevaFecha = new Date(`${this.citaSeleccionada.fecha}T${this.citaSeleccionada.hora}`);
      this.eventoSeleccionado.setStart(nuevaFecha);

      if (tipoInfo) {
        this.eventoSeleccionado.setProp('backgroundColor', tipoInfo.color);
      }
    }
    this.cerrarDetalles();
  }

  abrirNuevaCita() {
    const now = new Date();
    this.nuevaCita = { tipo: '', nombre: '' };
    this.seleccionTemporal = {
      startStr: now.toISOString(),
      end: now,
      view: {
        calendar: this.getCalendarApi()
      }
    };
    this.citaSeleccionada = {
      nombre: '',
      tipo: '',
      fecha: now.toISOString().split('T')[0],
      hora: now.toTimeString().split(':').slice(0, 2).join(':'),
      costo: 0
    };
    this.mostrarDetalles = true;
  }

  createEventId() {
    return String(this.events.length + 1);
  }

  changeMonth(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const month = parseInt(value, 10);
    this.selectedMonth = month;
    const date = new Date(this.selectedYear, month);
    const calendarApi = this.getCalendarApi();
    if (calendarApi) {
      calendarApi.gotoDate(date);
    }
  }

  changeYear(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const year = parseInt(value, 10);
    this.selectedYear = year;
    const date = new Date(year, this.selectedMonth);
    const calendarApi = this.getCalendarApi();
    if (calendarApi) {
      calendarApi.gotoDate(date);
    }
  }

  private getCalendarApi() {
    return this.calendarComponent.getApi();
  }

  private getTipoId(label: string): string {
    const tipo = this.tiposCita.find(t => t.label === label);
    return tipo ? tipo.id : '';
  }
}
