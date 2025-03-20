export class DataEntity {
    totalPatients: number;
    newPatients: number;
    pendingAppointments: number;
    completedTreatments: number;
    monthlyAppointments?: Map<string, number>;
    treatments?: {
        cleanings: number;
        extractions: number;
        fillings: number;
    };
    metrics?: {
        totalPatientsChange?: number;
        newPatientsChange?: number;
        pendingAppointmentsChange?: number;
        completedTreatmentsChange?: number;
    };

    constructor(params: {
        totalPatients: number;
        newPatients: number;
        pendingAppointments: number;
        completedTreatments: number;
        monthlyAppointments?: Map<string, number>;
        treatments?: {
            cleanings: number;
            extractions: number;
            fillings: number;
        };
        metrics?: {
            totalPatientsChange?: number;
            newPatientsChange?: number;
            pendingAppointmentsChange?: number;
            completedTreatmentsChange?: number;
        };
    }) {
        this.totalPatients = params.totalPatients;
        this.newPatients = params.newPatients;
        this.pendingAppointments = params.pendingAppointments;
        this.completedTreatments = params.completedTreatments;
        this.monthlyAppointments = params.monthlyAppointments || new Map<string, number>();
        this.treatments = params.treatments || { cleanings: 0, extractions: 0, fillings: 0 };
        this.metrics = {
            totalPatientsChange: params.metrics?.totalPatientsChange || 0,
            newPatientsChange: params.metrics?.newPatientsChange || 0,
            pendingAppointmentsChange: params.metrics?.pendingAppointmentsChange || 0,
            completedTreatmentsChange: params.metrics?.completedTreatmentsChange || 0
        };
    }


}
