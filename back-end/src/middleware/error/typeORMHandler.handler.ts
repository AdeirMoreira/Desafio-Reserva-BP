import { ERROR_MESSAGES } from "../../constants/errorMessages.constant";
import { COMMOM_TYPEORM_ERROR_CODES } from "../../constants/index.constant";

export function typeORMHandler(code?: number, message?: string): string {
  if (!code || !message) {
    return ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  }

  if (COMMOM_TYPEORM_ERROR_CODES.includes(code)) {
    return ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  }

  if (code === 1062) {
    return duplicateEntryError(message);
  }

  return ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
}

const duplicateEntryError = (message: string) => {
  const posicoes = [];
  for (let i = 0; i < message.length; i++) {
    if (message[i] === "'" && posicoes.length < 2) {
      posicoes.push(i);
    }
  }

  const dadoDuplocado = message.slice(posicoes[0] + 1, posicoes[1]);

  return `Já existe um resgistro com o dado '${dadoDuplocado}'.`;
};
