const API_URL = "https://api.pwnedpasswords.com/range/";

export async function fetchBreachSuffixes(prefix: string): Promise<string> {
  if (prefix.length !== 5) {
    throw new Error("Prefix must be exactly 5 characters");
  }

  const response = await fetch(`${API_URL}${prefix}`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return await response.text();
}