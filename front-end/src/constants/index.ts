export const API_BASE_URL: string = 'http://localhost:3003/'

export const ENDPOINTS = {
    LOGIN: API_BASE_URL + 'login',
    SIGNIN: API_BASE_URL + 'user',
    GET_USERS: (role: string) => API_BASE_URL + `user/${role}`,
    GET_BROKER: (idUser: number) => API_BASE_URL + `user/broker/${idUser}`,
    GET_CUSTOMER: (idUser: number) => API_BASE_URL + `user/customer/${idUser}`,
    GET_MEETINGS_BY_USER: (idUser: number) => API_BASE_URL + `meeting/user/${idUser}`,
    GET_MEETING: (idMeeting: number) => API_BASE_URL + `meeting/${idMeeting}`,
    POST_MEETING: API_BASE_URL + `meeting`,
    UPDATE_MEETING: (idMeeting: number) => API_BASE_URL + `meeting/${idMeeting}`,
    DELETE_MEETING: (idMeeting: number) => API_BASE_URL + `meeting/${idMeeting}`
}

export const VARIANTS = {
    danger: 'danger',
    success: 'success',
}

export const SUCCESS_MESSAGES = {
    MEETING_SCHEDULED: 'Reunião marcada com sucesso.',
    MEETING_UPDATED: 'Reunião atualizada com sucesso.',
    MEETING_DELETED: 'Reunião desmarcada com sucesso.'
}

export const ERROR_MESSAGES = {
    FILL_FIELDS: 'Por favor, preencha os campos'
}

export const USER_ROLES = {
    BROKER: 'Broker',
    CUSTOMER: 'Customer',
    ADMIN: 'ADM'
}