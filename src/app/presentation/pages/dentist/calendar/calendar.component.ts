import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormsModule } from '@angular/forms';

interface CitaType {
  id: string;
  label: string;
  color: string;
}
interface NuevaCita {
  tipo: string;
  nombre: string;
}

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, FullCalendarModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  tiposCita: CitaType[] = [
    { id: 'limpieza', label: 'Limpieza Dental', color: '#4477CE' },      // Azul sereno
    { id: 'revision', label: 'Revisión General', color: '#27374D' },      // Azul oscuro elegante
    { id: 'emergencia', label: 'Emergencia', color: '#526D82' },         // Gris azulado
    { id: 'ortodonia', label: 'Ortodoncia', color: '#9DB2BF' },          // Gris suave
    { id: 'blanqueamiento', label: 'Blanqueamiento', color: '#DDE6ED' }  // Gris muy claro
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
        dayMaxEvents: 2
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
    return {
      html: `
        <div class="event-content">
          <div class="time">${eventInfo.timeText}</div>
          <div class="title">${eventInfo.event.title}</div>
          <div class="type">${eventInfo.event.extendedProps.tipo}</div>
        </div>
      `
    };
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.seleccionTemporal = selectInfo;
    this.mostrarSelector = true;
    this.nuevaCita = { tipo: '', nombre: '' };
  }

  confirmarCita() {
    const { tipo, nombre } = this.nuevaCita;
    if (tipo && nombre && this.tiposCita.find(t => t.id === tipo)) {
      const tipoInfo = this.tiposCita.find(t => t.id === tipo);
      const newEvent = {
        id: this.createEventId(),
        title: nombre,
        start: this.seleccionTemporal.startStr,
        end: this.seleccionTemporal.endStr,
        backgroundColor: tipoInfo?.color,
        extendedProps: {
          tipo: tipoInfo?.label
        }
      };

      const calendarApi = this.seleccionTemporal.view.calendar;
      calendarApi.addEvent(newEvent);
      this.events.push(newEvent);
    }
    this.cerrarSelector();
  }

  cerrarSelector() {
    this.mostrarSelector = false;
    if (this.seleccionTemporal) {
      this.seleccionTemporal.view.calendar.unselect();
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm('¿Desea eliminar esta cita?')) {
      clickInfo.event.remove();
    }
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
}
