# Usar una imagen oficial de Node
FROM node:20

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar solo los archivos de dependencias primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto que usa tu servidor
EXPOSE 3000

# Comando para ejecutar la app (ajusta si usas nodemon)
CMD ["npm", "run", "dev"]