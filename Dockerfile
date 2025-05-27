FROM node:18

# Crear directorio de la app
WORKDIR /app

# Copiar archivos
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto (aunque venom usa WebSocket en local)
EXPOSE 8080

# Comando por defecto
CMD ["npm", "start"]