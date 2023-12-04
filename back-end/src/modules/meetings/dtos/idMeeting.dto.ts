import { IsNumber, Min } from "class-validator";
import { ValidationException } from "../../../middleware/error/custonErrors.error";
import { ErrorObject, validateDTO } from "../../utils/validator";

export class IdMeetingDTO {
    @IsNumber({ allowNaN: false }, { message: "Id da reunião inválido." })
    @Min(1, { message: "Id da reunião dever ser maior que 0." })
    idMeeting: number;
  
    constructor(data: IdMeetingDTO) {
      this.idMeeting = Number(data.idMeeting);
    }
  
    static async validate(data: unknown): Promise<IdMeetingDTO> {
      const dto = new this(data as any);
  
      const { validated, errors } = await validateDTO(dto);
  
      if (!validated) {
        throw new ValidationException(errors as ErrorObject);
      }
  
      return dto;
    }
  }
  