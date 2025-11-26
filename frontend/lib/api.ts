const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  analyze: async (code: string, language: string) => {
    const response = await fetch(`${API_URL}/api/analysis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language })
    });
    return response.json();
  },

  stitch: async (blocks: any[]) => {
    const response = await fetch(`${API_URL}/api/stitch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocks })
    });
    return response.json();
  },

  health: async () => {
    const response = await fetch(`${API_URL}/api/health`);
    return response.json();
  }
};

export { API_URL };
