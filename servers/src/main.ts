//main.ts sirve para iniciar la aplicación NestJS. Crea una instancia de la aplicación utiliza
// ndo el módulo raíz (AppModule) y luego escucha en un puerto específico (por defecto, 3000)
//  para recibir solicitudes entrantes.
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 1. Crea la aplicación basada en el módulo principal (AppModule)
  const app = await NestFactory.create(AppModule);

  // 2. Configuración de CORS: Permite que el frontend se comunique con el backend
  app.enableCors({
    origin: 'http://localhost:3000', // Solo permite peticiones desde tu Next.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Define qué acciones están permitidas
    credentials: true, // Permite el envío de cookies o tokens si fuera necesario
  });

  // 3. Acceso al motor interno para crear una ruta de prueba rápida
  const server = app.getHttpAdapter().getInstance();
  server.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
  });

  // 4. Activación del ValidationPipe para procesar los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignora datos que no estén en tu DTO (seguridad)
      forbidNonWhitelisted: true, // Lanza error si envían datos prohibidos
      transform: true, // Convierte automáticamente strings a números/booleanos
    }),
  );

  // 5. Encender el servidor en el puerto 3001
  await app.listen(3001);
  console.log(' Backend NestJS corriendo en: http://localhost:3001');
}

bootstrap();
