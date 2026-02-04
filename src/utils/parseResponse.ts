export function checkForMatch(responseText: string, suffixToFind: string): number {
  const lines = responseText.split('\n');
  
  for (const line of lines) {
    // API returns format: SUFFIX:COUNT
    const [suffix, count] = line.split(':');
    
    if (suffix.trim() === suffixToFind) {
      return parseInt(count, 10);
    }
  }

  return 0; // No match found
}