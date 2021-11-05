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

  input.forEach((item) => {
    response.set(item.code, item);
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
