export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  // Web Crypto API 
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);

  // converting ArrayBuffer to Hex String
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  // didn't work without upper cases
  return hashHex.toUpperCase();
}