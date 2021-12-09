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
export const parseLookup = (input: any[], keyName: string = 'code'): Map<string, any> => {
  if (!input) {
    return new Map();
  }

  const response = new Map();

  input.forEach((item, index) => {
    response.set(item[keyName], { ...item, index });
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

  let index = 1;

  while (input[`spec_${index}_name`] && input[`spec_${index}_detail`]) {
    result.push({ name: input[`spec_${index}_name`], detail: input[`spec_${index}_detail`] });
    index += 1;
  }

  return result;
};
