import { IsNumber, Min } from "class-validator";
import { ValidationException } from "../../../middleware/error/custonErrors.error";
import { ErrorObject, validateDTO } from "../../../shared/utils/validator";

export class IdMeetingDTO {
    @IsNumber({ allowNaN: false }, { message: "Invalid meeting id." })
    @Min(1, { message: "Meeting id must be greater than 0." })
    idMeeting: number;
  
    constructor(data: IdMeetingDTO) {
      this.idMeeting = Number(data.idMeeting);
    }
  
    static  validate(data: unknown): IdMeetingDTO {
      const dto = new this(data as any);
  
      const { validated, errors } = validateDTO(dto);
  
      if (!validated) {
        throw new ValidationException(errors as ErrorObject);
      }
  
      return dto;
    }
  }
  