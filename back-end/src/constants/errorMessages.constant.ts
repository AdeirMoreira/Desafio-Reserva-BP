type MeetingConfliteTimeMessage = {
  startAt: string;
  endAt: string;
  brokerName: string;
  meetingStar: string;
  meetingEnd: string;
};

export const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal server error.",
  DATA_VALIDATION_FAILURE: "Data Validation Failure.",
  DATA_NOT_FOUND: "Data not found.",
  UNAUTHORIZED: "Unauthorized.",
  DATABASE_START_FAILURE: "Error when starting database connection.",
  INVALID_TOKEN: "Invalid access token.",
  INVALID_CREDENTIALS: "Email ou senha incorretos, por favor tente novamente!",
  EMAIL_ALREADY_RESGISTRED: (email: string) =>  `O email ${email} já está em uso.`,
  MEETING_NOT_FOUND: 'Reunião não encontrada.',
  BROKER_NOT_FOUND: 'Corretor não encontrado.',
  CUSTOMER_NOT_FOUND: 'Cliente não encontrado.',
  INVALID_MEETING_TIME: 'A reunião de ter entre 30 minutos e 2 horas.',
  BROKER_MEETING_TIME_CONFLICT: ({
    startAt,
    endAt,
    brokerName,
    meetingStar,
    meetingEnd,
  }: MeetingConfliteTimeMessage) => `Não foi possível agendar reunião de ${startAt} às ${endAt} pois o/a corretor/a ${brokerName} já tem reunião agendada de ${meetingStar} às ${meetingEnd}.`,
  CUSTOMER_MEETING_TIME_CONFLICT: ({
    startAt,
    endAt,
    meetingStar,
    meetingEnd,
  }: Omit<MeetingConfliteTimeMessage, "brokerName">) => `Não foi possível agendar reunião de ${startAt} às ${endAt} pois você já tem reunião agendada de ${meetingStar} às ${meetingEnd}.`,
};
