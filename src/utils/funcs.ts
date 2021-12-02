// Convert a degree shortcode to the full title
export const parseDegree = (degree) => {
  switch (degree) {
    case 'bs':
      return 'Bachelor of Science';
    case 'ba':
      return 'Bachelor of Arts';
    default:
      return degree;
  }
};

// Parse a list of data with a code field, which will be converted to a Map
export const parseLookup = (input: any[]): Map<string, any> => {
  if (!input) {
    return new Map();
  }

  const response = new Map();

  input.forEach((item, index) => {
    response.set(item.code, { ...item, index });
  });

  return response;
};

// Parse a comma seperated list of strings into an array
// Handles varying whitespace and other potential errors
export const parseList = (input: string): string[] => {
  if (!input) {
    return [];
  }

  return input.split(',').map((element) => element.trim());
};

// Parse the major specializations structure into an array
// Handles empty specializations and makes rendering easier
export const parseSpecializations = (input: any): { name: string, detail: string }[] => {
  if (!input) {
    return [];
  }

  const result: { name: string, detail: string }[] = [];

  if (input.spec_1_name && input.spec_1_detail) {
    result.push({ name: input.spec_1_name, detail: input.spec_1_detail });
  }
  if (input.spec_2_name && input.spec_2_detail) {
    result.push({ name: input.spec_2_name, detail: input.spec_2_detail });
  }
  if (input.spec_3_name && input.spec_3_detail) {
    result.push({ name: input.spec_3_name, detail: input.spec_3_detail });
  }
  if (input.spec_4_name && input.spec_4_detail) {
    result.push({ name: input.spec_4_name, detail: input.spec_4_detail });
  }
  if (input.spec_5_name && input.spec_5_detail) {
    result.push({ name: input.spec_5_name, detail: input.spec_5_detail });
  }

  return result;
};
