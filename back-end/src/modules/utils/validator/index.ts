import { validate, ValidationError, ValidatorOptions } from "class-validator";

export interface ErrorObject {
  [key: string]: string[];
}

interface ValidationResult {
  validated: boolean;
  errors: ErrorObject | null;
}

const validatorOptions: ValidatorOptions = {
  enableDebugMessages: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  always: true,
  dismissDefaultMessages: true,
};

export const validateDTO = async (dto: object): Promise<ValidationResult> => {
  const errors: ValidationError[] = await validate(
    dto as object,
    validatorOptions
  );

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
