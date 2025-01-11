const DataValidator = (schema: any, body: any) => {
  let validation = schema.safeParse(body);
  if (validation.success) {
    return {
      isValid: validation.success,
      data: validation.data,
    };
  }
  return {
    isValid: validation.success,
    message: validation.error.issues[0].message,
  };
};

export default DataValidator;
