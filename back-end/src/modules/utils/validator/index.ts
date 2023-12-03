import { validate, ValidationError } from "class-validator";

export interface ErrorObject {
  [key: string]: string[];
}

interface ValidationResult {
  validated: boolean;
  errors: ErrorObject | null;
}

export const validateDTO = async (dto: object): Promise<ValidationResult> => {
  const errors: ValidationError[] = await validate(dto as object);

  if (errors.length > 0) {
    return {
      validated: false,
      errors: transformValidationErrors(errors),
    };
  }

  return { validated: true, errors: null };
};

function transformValidationErrors(errors: ValidationError[]): ErrorObject {
  const transformedErrors: ErrorObject = {};

  errors.forEach((error) => {
    const { property, constraints } = error;

    if (constraints) {
      transformedErrors[property] = Object.values(constraints);
    }
  });

  return transformedErrors;
}
