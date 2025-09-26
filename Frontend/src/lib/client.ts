const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = 'https://testapi.megamind.studio';
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      credentials: options.credentials || 'include', // Ensure credentials are included
      headers: {
        ...options.headers,
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      },
    });

    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    if (response.status === 204 || options.method === 'DELETE') {
      return null;
    }

    const data = await response.json().catch(() => null);
    return data;
  } catch (error) {
    console.error('API Request Failed:', {
      url,
      error: error instanceof Error ? error.message : error,
    });
    throw error;
  }
}