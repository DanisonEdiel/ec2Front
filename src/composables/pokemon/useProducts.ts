import { useQuery } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import { ref } from 'vue';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const errorDetails = ref('');
const responseDebug = ref<any>(null);

const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('Iniciando petición a la API de productos...');
    
    // Usar la API de productos de prueba
    const baseUrl = 'https://fakestoreapi.com';
    console.log('URL base de la API:', baseUrl);
    
    // Hacer la petición a la API externa
    const response = await fetch(`${baseUrl}/products?limit=5`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    responseDebug.value = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      data: data.slice(0, 2) // Solo mostrar los primeros 2 productos para depuración
    };
    
    console.log('Respuesta completa:', data);
    return data;
  } catch (error: any) {
    console.error('Error al obtener productos:', error);
    
    // Mejorar el detalle del error
    if (error.response) {
      errorDetails.value = `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.message) {
      errorDetails.value = error.message;
    } else {
      errorDetails.value = 'Error desconocido al obtener productos';
    }
    
    throw error;
  }
};

const useBooks = () => {
  const { data, isError, isFetching, error, refetch } = useQuery({ 
    queryKey: ['products'], 
    queryFn: fetchProducts, 
    initialData: [],
    retry: 1
  });
  
  return { 
    books: data, 
    isBooksError: isError, 
    isBooksFetching: isFetching, 
    errorDetails, 
    responseDebug,
    error,
    refetch 
  };
};

export default useBooks;
