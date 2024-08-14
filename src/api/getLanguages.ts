type Language = {
  name: string;
  aliases: string[];
};

export async function getLanguages() {
  const response = await fetch('https://api.github.com/languages');
  if (!response.ok) throw new Error('Failed to fetch languages');
  const data = await response.json();

  return data as Language[];
}
