import { useQuery } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import { ref } from 'vue';

const errorDetails = ref('');
const responseDebug = ref<any>(null);

const fetchHello = async (): Promise<string> => {
  try {
    console.log('Iniciando petición a la API...');
    
    // Verificar la URL base que se está usando
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    console.log('URL base de la API:', baseUrl);
    
    // Hacer la petición y guardar la respuesta completa para depuración
    const response = await api.get('/hello');
    
    responseDebug.value = {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      config: {
        baseURL: response.config.baseURL,
        url: response.config.url
      }
    };
    
    console.log('Respuesta completa:', response);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener hello:', error);
    
    // Mejorar el detalle del error
    if (error.response) {
      errorDetails.value = `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      errorDetails.value = 'No se recibió respuesta del servidor. Verifica la conexión.';
    } else {
      errorDetails.value = error.message || 'Error desconocido';
    }
    
    throw error;
  }
};

const useHello = () => {
  const { data, isError, isFetching, error, refetch } = useQuery({ 
    queryKey: ['hello'], 
    queryFn: fetchHello, 
    initialData: "",
    retry: 1
  });
  
  return { 
    hello: data, 
    isHelloError: isError, 
    isHelloFetching: isFetching, 
    errorDetails, 
    responseDebug,
    error,
    refetch 
  };
};

export default useHello;
