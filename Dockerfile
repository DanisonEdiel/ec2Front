FROM node:18-alpine as build-stage

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de archivos del proyecto
COPY . .

# Construir la aplicación (usará .env.production automáticamente)
RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine as production-stage

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
