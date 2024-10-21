const apiBaseUrl = process.env.API_URI || 'http://localhost:3000/api/';  // URL base de la API

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = 'Error desconocido';
    
    if (response.status === 401) {
      // Error de autorización, intentar renovar el token
      throw new Error('Unauthorized');
    } else if (response.status >= 400 && response.status < 500) {
      // Errores de cliente (4xx)
      errorMessage = `Error del cliente: ${response.status} - ${response.statusText}`;
    } else if (response.status >= 500) {
      // Errores del servidor (5xx)
      errorMessage = `Error del servidor: ${response.status} - ${response.statusText}`;
    }

    // Mostrar el error en consola o alertar al usuario
    console.log(errorMessage);
    throw new Error(errorMessage);
  }

  return await response.json(); // O response.text(), dependiendo del tipo de respuesta
};

const fetchWithRetry = async (url: string, options: RequestInit, retry = true) => {
  try {
    const response = await fetch(url, options);
    // console.log(response);
    return await handleResponse(response);
  } catch (error) {
    if ((error as Error).message === 'Unauthorized' && retry) {
      await renewToken();
      return fetchWithRetry(url, options, false); // Reintentar la solicitud original
    } else {
      throw error;
    }
  }
};

export const renewToken = async () => {
  const refreshResponse = await fetch(`${apiBaseUrl}auth/refresh-token`, {
    method: 'POST',
    credentials: 'include', // Incluye las cookies en la solicitud
  });

  if (!refreshResponse.ok) {
    throw new Error('Failed to refresh token');
  }

  return refreshResponse.json();
}

// GET Request
export const getRequest = async (endpoint: string, params?: Record<string, string>) => {
  try {
    const url = new URL(`${apiBaseUrl}${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }
    return await fetchWithRetry(url.toString(), { 
      method: 'GET',
      credentials:'include',
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// POST Request
export const postRequest = async (endpoint: string, body: Record<string, unknown>) => {
  try {
    return await fetchWithRetry(`${apiBaseUrl}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// PUT Request
export const putRequest = async (endpoint: string, body: Record<string, unknown>) => {
  try {
    return await fetchWithRetry(`${apiBaseUrl}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// PATCH Request
export const patchRequest = async (endpoint: string, body: Record<string, unknown>) => {
  try {
    return await fetchWithRetry(`${apiBaseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// DELETE Request
export const deleteRequest = async (endpoint: string) => {
  try {
    return await fetchWithRetry(`${apiBaseUrl}${endpoint}`, { method: 'DELETE' });
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
