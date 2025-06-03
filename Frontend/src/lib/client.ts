const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const url = `${baseUrl}${endpoint}`;

  console.log('API Request:', { url, options });

  try {
    const response = await fetch(url, {
      ...options,
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

    // For DELETE requests or empty responses, return null
    if (response.status === 204 || options.method === 'DELETE') {
      return null;
    }

    // Try to parse JSON response
    const data = await response.json().catch(() => null);
    console.log('API Response Data:', data);
    return data;
  } catch (error) {
    console.error('API Request Failed:', {
      url,
      error: error instanceof Error ? error.message : error,
    });
    throw error;
  }
}
