export const BASE_URL = "http://localhost:5000";
export const API_URL = `${BASE_URL}/api`;

export const APIS = {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    USER_PROFILE: `${API_URL}/users/me`,
    UPDATE_PROFILE: `${API_URL}/user/update-profile`,
    GET_APPOINTMENTS: `${API_URL}/appointments`,
    CANCEL_APPOINTMENT: (appointmentId) => `${API_URL}/appointments/${appointmentId}/cancel`,
    GET_DOCTORS: `${API_URL}/doctors`,
    GET_DOCTOR_DETAILS: (doctorId) => `${API_URL}/doctors/${doctorId}`,
    GET_MEDICAL_RECORDS: `${API_URL}/medical-records`,
    ADD_MEDICAL_RECORD: `${API_URL}/medical-records/add`,
    UPDATE_MEDICAL_RECORD: (recordId) => `${API_URL}/medical-records/${recordId}/update`,
    DOCTORS: `${API_URL}/doctors`,
    PATIENTS: `${API_URL}/patients`,
    APPOINTMENTS: `${API_URL}/appointments`,
    MEDICAL_RECORDS: `${API_URL}/medical-records`,
    RECORDS: `${API_URL}/records`,
    CONFIRM_APPOINTMENT: `${API_URL}/appointments/confirm`,
}

export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
};
export const CONTENT_TYPES = {
    JSON: 'application/json',
    FORM: 'multipart/form-data',
    TEXT: 'text/plain'
};