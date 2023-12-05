import express from "express"
import { meetingController } from "../factory/meeting.factory"

const meetingRoutes = express.Router()

meetingRoutes.get('/:idUser', meetingController.getMeetings)
meetingRoutes.post('', meetingController.createMeeting)
meetingRoutes.patch('/:idMeeting', meetingController.updateMeeting)
meetingRoutes.delete('/:idMeeting', meetingController.deleteMeeting)

export default meetingRoutes