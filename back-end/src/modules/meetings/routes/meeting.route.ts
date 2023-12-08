import express from "express"
import { meetingController } from "../factory/meeting.factory"
import { USER_ROLE } from "../../../constants/index.constant"
import { authMiddleware } from "../../../middleware/auth/auth.middleware"

const meetingRoutes = express.Router()

/**
 * @swagger
 * /meeting/{idMeeting}:
 *   get:
 *     summary: Busca dos dados de uma reunião agendada.
 *     tags: [Meeting]
 *     parameters:
 *       - in: path
 *         name: idMeeting
 *         description: ID da reunião.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados da Reunião buscado com sucesso.
 */

meetingRoutes.get('/:idUser', authMiddleware(), meetingController.getMeetings)

/**
 * @swagger
 * /meeting:
 *   post:
 *     summary: Agenda um nova reunião entre corretores e clientes.
 *     tags: [Meeting]
 *     requestBody:
 *       description: Dados da reninão a ser criada.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idBroker: 
 *                 type: number
 *               idCostuner: 
 *                 type: number
 *               starAt:
 *                 type: string
 *               endAt: 
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reunião atualizada com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               - idMeeting: 5
 *                 idBroker: 1
 *                 idCostumer: 2
 *                 startAt: "2023-12-03T12:40:12"
 *                 endAt: "2023-12-03T13:20:12"
 *                 createdAt: "2023-12-05T03:30:11.000Z"
 *                 updatedAt: "2023-12-05T03:30:11.000Z"
 *                 deletedAt: null
 *       401:
 *         description: acesso negado
 *       416:
 *         description: Falha na validação  
 */

meetingRoutes.post('', authMiddleware(USER_ROLE.CUSTOMER), meetingController.createMeeting)

/**
 * @swagger
 * /meeting/{idMeeting}:
 *   patch:
 *     summary: Atualiza os dados da reunião.
 *     tags: [Meeting]
 *     parameters:
 *       - in: path
 *         name: idMeeting
 *         description: ID da reunião.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados da reninão a ser criada.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idBroker: 
 *                 type: number
 *               idCostuner: 
 *                 type: number
 *               starAt:
 *                 type: string
 *               endAt: 
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Reunião atualizada com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               - idMeeting: 5
 *                 idBroker: 1
 *                 idCostumer: 2
 *                 startAt: "2023-12-03T12:40:12"
 *                 endAt: "2023-12-03T13:20:12"
 *                 createdAt: "2023-12-05T03:30:11.000Z"
 *                 updatedAt: "2023-12-05T03:30:11.000Z"
 *                 deletedAt: null
 *       404:
 *         description: Corretor não encontrado
 *       416:
 *         description: Falha na validação           
 */

meetingRoutes.patch('/:idMeeting', authMiddleware(), meetingController.updateMeeting)

/**
 * @swagger
 * /meeting/{idMeeting}:
 *   delete:
 *     summary: Exclui uma reunião agendada.
 *     tags: [Meeting]
 *     parameters:
 *       - in: path
 *         name: idMeeting
 *         description: ID da reunião.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reunião excluída com sucesso.
 *       404:
 *         description: Reunião não encontrada
 */

meetingRoutes.delete('/:idMeeting', authMiddleware(), meetingController.deleteMeeting)

export default meetingRoutes