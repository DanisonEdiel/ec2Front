<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useHello from '@/composables/pokemon/useHello';
import useBooks from '@/composables/pokemon/useProducts';

const { hello, isHelloError, isHelloFetching, errorDetails, responseDebug, error, refetch } = useHello();
const helloText = ref<string>('');

// Forzar una recarga al montar el componente
onMounted(() => {
  refetch();
});

// Función para hacer una petición directa sin Vue Query
const fetchDirectly = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    const response = await fetch(`${apiUrl}/api/hello`);
    const text = await response.text();
    console.log('Respuesta directa:', response);
    console.log('Contenido de la respuesta:', text);
    helloText.value = text;
  } catch (err) {
    console.error('Error en fetch directo:', err);
  }
};
const { books, isBooksError, isBooksFetching } = useBooks();
</script>

<template>
  <div class="debug-container">
    <h2>API Test</h2>
    <div class="response-section">
      <h3>Respuesta de Vue Query:</h3>
      <div v-if="isHelloFetching">Cargando..</div>
      <div v-else-if="isHelloError" class="error">
        <p>Error: {{ error?.message }}</p>
        <p>Detalles: {{ errorDetails }}</p>
      </div>
      <div v-else>
        <p><strong>Contenido recibido: </strong> "{{ hello }}"</p>
        <pre v-if="responseDebug" class="debug-info">{{ JSON.stringify(responseDebug, null, 2) }}</pre>
      </div>
      <button @click="() => refetch()">Recargar</button>
    </div>
  </div>
  <div class="products-container">
    <h2>Inventory List</h2>
    <div v-if="isBooksFetching">Cargando productos...</div>
    <div v-else-if="isBooksError" class="error">
      <p>Error al cargar productos: {{ errorDetails }}</p>
    </div>
    <div v-else class="products-grid">
      <div v-for="product in books" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" class="product-image">
        <div class="product-details">
          <h3>{{ product.name }}</h3>
          <p class="product-price">${{ product.price.toFixed(2) }}</p>
          <p class="product-category">{{ product.category }}</p>
          <p class="product-description">{{ product.description.substring(0, 100) }}...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.debug-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.products-container {
  padding: 20px;
  max-width: 1200px;
  margin: 20px auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  padding: 10px;
  background-color: #f9f9f9;
}

.product-details {
  padding: 15px;
}

.product-details h3 {
  margin-top: 0;
  font-size: 16px;
  height: 40px;
  overflow: hidden;
}

.product-price {
  font-weight: bold;
  color: #e91e63;
  font-size: 18px;
  margin: 8px 0;
}

.product-category {
  color: #666;
  font-size: 14px;
  text-transform: capitalize;
  margin: 5px 0;
}

.product-description {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  height: 60px;
  overflow: hidden;
}

.response-section {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  color: red;
}

.debug-info {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow: auto;
  max-height: 300px;
  font-size: 12px;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>