export class DataEntity {
    totalPatients: number;
    newPatients: number;
    pendingAppointments: number;
    completedTreatments: number;
    monthlyAppointments: Map<string, number>;
    treatments: {
        cleanings: number;
        extractions: number;
        fillings: number;
    };
    metrics: {
        totalPatientsChange: number;
        newPatientsChange: number;
        pendingAppointmentsChange: number;
        completedTreatmentsChange: number;
    };

    constructor(params: {
        totalPatients: number;
        newPatients: number;
        pendingAppointments: number;
        completedTreatments: number;
        monthlyAppointments: Map<string, number>;
        treatments: {
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
        this.monthlyAppointments = params.monthlyAppointments;
        this.treatments = params.treatments;
        this.metrics = {
            totalPatientsChange: params.metrics?.totalPatientsChange || 0,
            newPatientsChange: params.metrics?.newPatientsChange || 0,
            pendingAppointmentsChange: params.metrics?.pendingAppointmentsChange || 0,
            completedTreatmentsChange: params.metrics?.completedTreatmentsChange || 0
        };
    }

    getTreatmentDistribution(): { cleanings: number; extractions: number; fillings: number } {
        const total = this.treatments.cleanings + this.treatments.extractions + this.treatments.fillings;
        return {
            cleanings: (this.treatments.cleanings / total) * 100,
            extractions: (this.treatments.extractions / total) * 100,
            fillings: (this.treatments.fillings / total) * 100
        };
    }
}
