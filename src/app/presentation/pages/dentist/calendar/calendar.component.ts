import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { DentalManagement, DentalAppointment, AppointmentType, AppointmentStatus } from '../model/dental-management.model';

interface NuevaCita {
  tipo: string;
  nombre: string;
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

  tiposCita = [
    { id: 'limpieza' as AppointmentType, label: 'Limpieza Dental', color: '#007AFF' },
    { id: 'consulta' as AppointmentType, label: 'Consulta', color: '#5856D6' },
    { id: 'tratamiento' as AppointmentType, label: 'Tratamiento', color: '#FF2D55' }
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
  citaSeleccionada: Partial<DentalAppointment> & { patientName?: string } = {
    id: '',
    date: new Date(),
    time: '',
    type: 'consulta',
    status: 'pendiente',
    duration: 30
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

    // Obtener el tipo de cita de manera segura
    const tipo = this.tiposCita.find(t => t.id === eventInfo.event.extendedProps.type);
    const typeLabel = tipo ?
      (isMobile ? tipo.label.split(' ')[0] : tipo.label) :
      'Consulta';

    // Renderizar diferente para móviles
    if (isMobile) {
      return {
        html: `
          <div class="event-content">
            <div class="event-info">
              <div class="title">${eventInfo.event.title}</div>
              <div class="event-details mobile">
                <span class="time">${timeStr}</span>
                <span class="type">${typeLabel}</span>
              </div>
            </div>
          </div>
        `
      };
    }

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

    // Asegurarnos de mantener la hora actual al seleccionar una fecha
    const currentHour = new Date().getHours();
    const currentMinutes = new Date().getMinutes();
    selectedDate.setHours(currentHour, currentMinutes, 0);

    this.citaSeleccionada = {
      id: '',
      date: selectedDate,
      time: `${String(currentHour).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`,
      type: 'consulta',
      status: 'pendiente',
      duration: 30,
      patientName: ''
    };

    this.mostrarDetalles = true;
    this.eventoSeleccionado = null;
  }

  confirmarCita() {
    const { type, patientName } = this.citaSeleccionada;
    if (type && patientName) {
      const tipoInfo = this.tiposCita.find(t => t.id === type);

      // Asegurarnos de que tenemos una fecha válida
      const fechaBase = this.citaSeleccionada.date instanceof Date ?
        this.citaSeleccionada.date :
        new Date(this.citaSeleccionada.date || new Date());

      // Manejar la hora de forma segura
      const time = this.citaSeleccionada.time || '00:00';
      const [hours = '0', minutes = '0'] = time.split(':');

      const fechaHora = new Date(fechaBase);
      fechaHora.setHours(parseInt(hours), parseInt(minutes), 0);

      const newAppointment: DentalAppointment = {
        id: this.createEventId(),
        date: fechaHora,
        time: time,
        type: type,
        status: 'pendiente',
        duration: this.citaSeleccionada.duration || 30,
        notes: this.citaSeleccionada.notes
      };

      // Crear el evento para el calendario
      const eventToAdd = {
        id: newAppointment.id.toString(),
        title: patientName,
        start: fechaHora,
        end: new Date(fechaHora.getTime() + (newAppointment.duration * 60000)), // Agregar duración en minutos
        backgroundColor: tipoInfo?.color,
        extendedProps: {
          type: type,
          status: newAppointment.status,
          duration: newAppointment.duration,
          notes: newAppointment.notes
        }
      };

      // Agregar el evento al calendario y al array de eventos
      const calendarApi = this.getCalendarApi();
      calendarApi.addEvent(eventToAdd);
      this.events.push(eventToAdd);
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
      date: clickInfo.event.start || new Date(),
      time: clickInfo.event.start?.toTimeString().split(':').slice(0, 2).join(':') || '',
      type: clickInfo.event.extendedProps.type,
      status: clickInfo.event.extendedProps.status,
      duration: clickInfo.event.extendedProps.duration,
      notes: clickInfo.event.extendedProps.notes,
      patientName: clickInfo.event.title
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
      const tipoInfo = this.tiposCita.find(t => t.id === this.citaSeleccionada.type);

      // Manejar la fecha y hora de forma segura
      const fechaBase = this.citaSeleccionada.date || new Date();
      const time = this.citaSeleccionada.time || '00:00';
      const [hours = '0', minutes = '0'] = time.split(':');

      const fechaHora = new Date(fechaBase);
      fechaHora.setHours(parseInt(hours), parseInt(minutes), 0);

      const appointment: Partial<DentalAppointment> = {
        id: this.eventoSeleccionado.id,
        date: fechaHora,
        time: time,
        type: this.citaSeleccionada.type,
        status: this.citaSeleccionada.status,
        duration: this.citaSeleccionada.duration,
        notes: this.citaSeleccionada.notes
      };

      this.eventoSeleccionado.setProp('title', this.citaSeleccionada.patientName);
      this.eventoSeleccionado.setStart(appointment.date);
      this.eventoSeleccionado.setExtendedProp('type', appointment.type);
      this.eventoSeleccionado.setExtendedProp('status', appointment.status);
      this.eventoSeleccionado.setExtendedProp('duration', appointment.duration);
      this.eventoSeleccionado.setExtendedProp('notes', appointment.notes);

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
      id: '',
      date: now,
      time: now.toTimeString().split(':').slice(0, 2).join(':'),
      type: 'consulta',
      status: 'pendiente',
      duration: 30
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
