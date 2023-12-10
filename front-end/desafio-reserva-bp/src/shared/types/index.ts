export type Meeting = {
  idMeeting: number | null
  idBroker: number | null
  idCustomer: number | null
  startAt: string | null
  endAt: string | null
  broker?: string
  customer?: string
}

export type Broker = {
  value: number
  text: string
}


