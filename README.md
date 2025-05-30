# Frontend Vue.js para EC2

Este proyecto es una aplicación frontend Vue.js configurada para ser desplegada en una instancia EC2 de AWS a través de Docker Hub.

## Enfoque del proyecto

Este proyecto sigue un enfoque simple:

1. La aplicación se construye como una imagen Docker
2. La imagen se sube a Docker Hub mediante GitHub Actions
3. La instancia EC2 jala (pull) la imagen de Docker Hub manualmente

## Configuración del proyecto

### Requisitos previos
- Node.js (versión 18 o superior)
- npm o yarn
- Docker (para pruebas locales)
- Cuenta de GitHub con GitHub Actions habilitado
- Cuenta de Docker Hub
- Instancia EC2 con Docker instalado

### Instalación local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## Construcción y publicación de la imagen Docker

Este proyecto utiliza GitHub Actions para automatizar la construcción y publicación de la imagen Docker. El flujo de trabajo es el siguiente:

1. Cuando se hace push a la rama principal (main o master), GitHub Actions se activa
2. Se construye la imagen Docker de la aplicación
3. La imagen se sube a Docker Hub

### Configuración de secretos en GitHub

Para que el workflow funcione correctamente, debes configurar los siguientes secretos en tu repositorio de GitHub:

1. `DOCKERHUB_USERNAME`: Tu nombre de usuario de Docker Hub
2. `DOCKERHUB_TOKEN`: Tu token de acceso personal de Docker Hub

## Despliegue manual en EC2

Para desplegar la aplicación en tu instancia EC2, debes ejecutar los siguientes comandos:

```bash
# Conectarse a la instancia EC2
ssh -i tu-clave.pem usuario@tu-ip-ec2

# Detener y eliminar el contenedor anterior si existe
sudo docker stop ec2front || true
sudo docker rm ec2front || true

# Jalar la última imagen de Docker Hub
sudo docker pull danisonediel/ec2front:latest

# Ejecutar el nuevo contenedor
sudo docker run -d --name ec2front -p 80:80 \
  -e VITE_API_URL=tu-url-de-backend \
  --restart always \
  danisonediel/ec2front:latest
```

## Estructura del proyecto

```
.
├── .github/workflows/    # Configuración de GitHub Actions
├── public/               # Archivos públicos
├── src/                  # Código fuente
├── Dockerfile            # Configuración de Docker
├── nginx.conf            # Configuración de Nginx
└── README.md             # Este archivo
```

## Variables de entorno

Las variables de entorno se configuran en el archivo `.env` para desarrollo local y mediante el flag `-e` al ejecutar el contenedor Docker.

- `VITE_API_URL`: URL de la API backend

## Comandos útiles para la instancia EC2

```bash
# Ver contenedores en ejecución
sudo docker ps

# Detener el contenedor
sudo docker stop ec2front

# Iniciar el contenedor
sudo docker start ec2front

# Ver los logs del contenedor
sudo docker logs ec2front

# Eliminar el contenedor
sudo docker rm ec2front

# Eliminar la imagen
sudo docker rmi danisonediel/ec2front:latest
```
