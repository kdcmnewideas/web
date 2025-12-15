/**
 * Generates two-letter initials from a full name.
 * @param {string} fullName - The full name (e.g., "Jane Doe").
 * @returns {string} The two-letter initials in uppercase (e.g., "JD").
 */
export function getInitials(fullName: string) {
  // 1. Trim whitespace from the start and end of the name.
  // 2. Split the name string into an array of words based on spaces.
  const nameParts = fullName.trim().split(/\s+/);

  // Get the first letter of the first word (First Name)
  const firstNameInitial = nameParts[0].charAt(0);

  // Check if there is more than one word to use as the last word (Last Name)
  if (nameParts.length > 1) {
    // Get the first letter of the last word (Last Name)
    const lastNameInitial = nameParts[nameParts.length - 1].charAt(0);

    // Combine them and convert to uppercase
    return (firstNameInitial + lastNameInitial).toUpperCase();
  } else {
    // If only one word is provided, just return the first letter of that word,
    // and maybe an 'N' for "No last name" or just the one letter.
    // For this example, we'll return the single letter repeated.
    return (firstNameInitial + firstNameInitial).toUpperCase();
  }
}