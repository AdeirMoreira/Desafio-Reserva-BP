import express from "express";
import { userController } from "../factory/users.factory";
import { authMiddleware } from "../../../middleware/auth/auth.middleware";
import { USER_ROLE } from "../../../constants/index.constant";

const userRoutes = express.Router();

/**
 * @swagger
 * /user/broker/{idUser}:
 *   get:
 *     summary: Buscar os corretores e suas reuniões.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         description: ID do corretor.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Corretores buscados com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               - idUser: 3
 *                 name: "teste"
 *                 email: "teste@email.com"
 *                 role: "Broker"
 *                 brokerMeetings:
 *                   - idMeeting: 6
 *                     idBroker: 3
 *                     idCostumer: 2
 *                     startAt: "2023-12-03T15:40:12"
 *                     endAt: "2023-12-03T16:20:12"
 *                     createdAt: "2023-12-05T03:30:11.000Z"
 *                     updatedAt: "2023-12-05T03:30:11.000Z"
 *                     deletedAt: null
 */

userRoutes.get("/broker/:idUser", authMiddleware(USER_ROLE.BROKER), userController.getBrokers);

/**
 * @swagger
 * /user/costumer/{idUser}:
 *   get:
 *     summary: Buscar os clientes e suas reuniões.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         description: ID do cliente.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Clientes buscados com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               - idUser: 2
 *                 name: "Dam"
 *                 email: "darmstdio@email.com"
 *                 role: "Costumer"
 *                 costumerMeetings:
 *                   - idMeeting: 5
 *                     idBroker: 1
 *                     idCostumer: 2
 *                     startAt: "2023-12-03T12:40:12"
 *                     endAt: "2023-12-03T13:20:12"
 *                     createdAt: "2023-12-05T03:30:11.000Z"
 *                     updatedAt: "2023-12-05T03:30:11.000Z"
 *                     deletedAt: null
 */

userRoutes.get("/costumer/:idUser", authMiddleware(USER_ROLE.COSTUMER), userController.getCostumers);
userRoutes.post("",  userController.createUser);
userRoutes.patch("/:idUser", authMiddleware(USER_ROLE.BROKER),  userController.updateUser);
userRoutes.delete("/:idUser",  userController.deleteUser);

export default userRoutes;
