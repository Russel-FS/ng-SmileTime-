import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DentalAppointment, AppointmentType, AppointmentStatus } from '../model/dental-management.model';
import { CalendarService } from '../../../../infrastructure/datasources/dentist/calendar.service';
import { Pacient } from '../model/pacient';
import { PatientService } from '../../../../infrastructure/datasources/dentist/patient.service';

interface AppointmentForm {
  type: string;
  patientName: string;
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
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  // Calendar Configuration
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
        dayMaxEvents: 3,
        eventMinHeight: 24,
      }
    },
    events: [],
    eventDidMount: (info) => {
      info.el.style.backgroundColor = info.event.backgroundColor;
    }
  };

  // Appointment Types
  tiposCita = [
    { id: 'limpieza' as AppointmentType, label: 'Limpieza Dental', color: '#007AFF' },
    { id: 'consulta' as AppointmentType, label: 'Consulta', color: '#5856D6' },
    { id: 'tratamiento' as AppointmentType, label: 'Tratamiento', color: '#FF2D55' }
  ];

  // Date Navigation
  readonly months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  /** años */
  readonly years = Array.from(new Array(10), (_, i) => new Date().getFullYear() + i);

  // estado variables son para el selector de mes y año
  events: any[] = [];
  currentDate = new Date();
  selectedMonth: number;
  selectedYear: number;
  mostrarSelector = false;
  mostrarDetalles = false;
  eventoSeleccionado: any = null;

  // Forms
  nuevaCita: AppointmentForm = { type: '', patientName: '' };
  seleccionTemporal: any;
  citaSeleccionada: Partial<DentalAppointment> & { patientName?: string } = {
    id: '',
    date: new Date(),
    time: '',
    type: 'consulta',
    status: 'pendiente',
    duration: 30
  };

  // Añadir nuevas propiedades
  searchResults: Pacient[] = [];
  searchTerm = '';
  selectedPatient: Pacient | null = null;

  /**
   * Constructor de la clase.
   * Inicializa las variables de instancia `selectedMonth` y `selectedYear`
   * con el mes y año actuales.
   */
  constructor(
    private calendarService: CalendarService,
    private patientService: PatientService
  ) {
    const today = new Date();
    this.selectedMonth = today.getMonth();
    this.selectedYear = today.getFullYear();

    // Suscribirse a los resultados de búsqueda
    this.patientService.getPatients().subscribe(results => {
      this.searchResults = results;
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.updateResponsiveSettings();
    this.loadAppointments();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        this.updateResponsiveSettings();
      });
    }
  }
  /** 
   * Método para inicializar el componente.
   * Se llama al cargar el componente.
   */
  private updateResponsiveSettings() {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      const calendarApi = this.getCalendarApi();

      if (calendarApi) {
        calendarApi.setOption('views', {
          dayGridMonth: {
            dayMaxEvents: isMobile ? 2 : 3,
            eventMinHeight: isMobile ? 20 : 24,
          }
        });
      }
    }
  }

  loadAppointments() {
    if (!this.calendarComponent) {
      console.warn('El calendario aún no está inicializado');
      return;
    }

    this.calendarService.getAppointments().subscribe(appointments => {
      console.log('Citas cargadas:', appointments);

      // Convertir las citas en eventos del calendario
      const events = appointments.map(appointment => {
        const tipoInfo = this.tiposCita.find(t => t.id === appointment.type);
        const fechaHora = new Date(appointment.date);

        return {
          id: appointment.id.toString(),
          title: `Paciente ${appointment.id}`,
          start: fechaHora,
          end: new Date(fechaHora.getTime() + (appointment.duration * 60000)),
          backgroundColor: tipoInfo?.color,
          extendedProps: {
            type: appointment.type,
            status: appointment.status,
            duration: appointment.duration,
            notes: appointment.notes
          }
        };
      });

      // Agregar eventos al calendario
      const calendarApi = this.getCalendarApi();
      if (calendarApi) {
        events.forEach(event => {
          calendarApi.addEvent(event);
          this.events.push(event);
        });
      }
    });
  }

  /**
   * Método para abrir el selector de mes y año.
   * Muestra el selector y establece el mes y año seleccionados.
   * @param event El evento de clic.
   */
  renderEventContent(eventInfo: any) {
    const isMobile = window.innerWidth < 768;

    // Formatear hora para móviles de manera más compacta
    const timeStr = eventInfo.timeText ?
      new Date(eventInfo.event.start).toLocaleTimeString('es', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: isMobile
      }).replace(/\s/g, '').toLowerCase() : '';

    // Obtener el tipo de cita 
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

  /**
   * Método para manejar la selección de una fecha en el calendario.
   * Establece la fecha seleccionada y muestra el formulario de detalles.
   * @param selectInfo Información de la selección de fecha.
   */
  handleDateSelect(selectInfo: DateSelectArg) {
    const selectedDate = selectInfo.start;

    //  hora actual al seleccionar una fecha
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
  /**
   * Método para confirmar la cita y cerrar el selector de mes y año.
   * Cambia la visibilidad del selector y establece el mes y año seleccionados.
   */
  confirmarCita() {
    // Validar que se haya seleccionado un paciente válido
    if (!this.selectedPatient) {
      alert('Por favor, seleccione un paciente válido de la lista');
      return;
    }

    const { type } = this.citaSeleccionada;
    if (type && this.selectedPatient) {
      const tipoInfo = this.tiposCita.find(t => t.id === type);

      // fecha válida
      const fechaBase = this.citaSeleccionada.date instanceof Date ?
        this.citaSeleccionada.date :
        new Date(this.citaSeleccionada.date || new Date());

      // Manejar la hora 
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
        title: this.selectedPatient.fullName,
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

      this.calendarService.addAppointment(newAppointment).subscribe(success => {
        if (success) {
          const calendarApi = this.getCalendarApi();
          if (calendarApi) {
            calendarApi.addEvent(eventToAdd);
          } else {
            console.warn('No se pudo agregar el evento porque el calendario no está inicializado');
          }
          this.events.push(eventToAdd);
        }
      });
    }
    this.cerrarDetalles();
  }

  /**
   * Método para cerrar el selector de mes y año.
   * Cambia la visibilidad del selector.
   */
  cerrarSelector() {
    this.mostrarSelector = false;
    if (this.seleccionTemporal) {
      this.seleccionTemporal.view.calendar.unselect();
    }
  }
  /**
   * Método para manejar el clic en un evento del calendario.
   * Muestra los detalles del evento seleccionado.
   * @param clickInfo Información del evento clicado.
   * @returns void
   */
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

  /**
   * Método para cerrar el formulario de detalles de la cita.
   * Cambia la visibilidad del formulario y restablece la cita seleccionada.
   */
  cerrarDetalles() {
    this.mostrarDetalles = false;
    this.eventoSeleccionado = null;
  }

  /**
   * Método para eliminar una cita.
   * Solicita confirmación al usuario antes de proceder con la eliminación.
   * @returns void
   */
  eliminarCita() {
    if (confirm('¿Está seguro de eliminar esta cita?')) {
      const appointmentId = this.eventoSeleccionado.id;
      this.calendarService.deleteAppointment(appointmentId).subscribe(success => {
        if (success) {
          this.eventoSeleccionado?.remove();
          this.cerrarDetalles();
        }
      });
    }
  }

  /**
   * Método para guardar los cambios realizados en la cita seleccionada.
   * Actualiza la información del evento en el calendario.
   * @returns void
   */
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

      this.calendarService.updateAppointment(appointment as DentalAppointment).subscribe(success => {
        if (success) {
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
      });
    }
    this.cerrarDetalles();
  }

  /**
   * Método para abrir un nuevo formulario de cita.
   * Inicializa los valores necesarios para crear una nueva cita.
   * @returns void
   */

  abrirNuevaCita() {
    const now = new Date();
    this.nuevaCita = { type: '', patientName: '' };
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
  /**
   * Método para crear un nuevo ID de evento.
   * Genera un ID único basado en la longitud del array de eventos.
   * @returns string
   */
  createEventId() {
    return String(this.events.length + 1);
  }
  /**
   * Método para manejar el cambio de mes en el calendario.
   * Cambia la fecha del calendario al mes seleccionado.
   * @param event El evento de cambio de mes.
   * @returns void
   */
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
  /**
   * Método para manejar el cambio de año en el calendario.
   * Cambia la fecha del calendario al año seleccionado.
   * @param event El evento de cambio de año.
   * @returns void
   */
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
  /**
   * Método para obtener la API del calendario.
   * @returns FullCalendarComponent
   */
  private getCalendarApi() {
    if (!this.calendarComponent) {
      console.warn('Componente de calendario no inicializado');
      return null;
    }
    return this.calendarComponent.getApi();
  }
  /**
   * Método para buscar pacientes por nombre.
   * Llama al servicio de pacientes para realizar la búsqueda.
   * @param term El término de búsqueda.
   * @returns void
   */
  onSearch(term: string): void {
    this.searchTerm = term;
    this.selectedPatient = null;
    this.patientService.search(term);
  }
  /**
   * Método para seleccionar un paciente de la lista de resultados.
   * Establece el paciente seleccionado y actualiza el formulario de cita.
   * @param patient El paciente seleccionado.
   * @returns void
   */
  selectPatient(patient: Pacient): void {
    this.selectedPatient = patient;
    this.searchTerm = patient.fullName || '';
    this.citaSeleccionada.patientName = patient.fullName || '';
    this.searchResults = [];
  }
}
