import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { AxiosError } from 'axios';

export function handleAxiosError(error: any): never {
     if (error.isAxiosError) {
          const axiosError = error as AxiosError;

          if (axiosError.response) {
               const { status, data } = axiosError.response;

               // Permite ver todo el contenido del error que vino del microservicio
               console.error('🛑 Error del microservicio:', {
                    status,
                    data,
               });

               throw new HttpException(data, status); // Devuelve el error tal como lo mandó el microservicio
          }

          // Si no hay respuesta del microservicio
          console.error('⚠️ Error de red al comunicarse con el microservicio:', axiosError.message);
          throw new InternalServerErrorException('No se pudo contactar al microservicio');
     }

     // Errores no relacionados con Axios
     console.error('❌ Error desconocido no relacionado a Axios:', error);
     throw new InternalServerErrorException('Error inesperado en la petición');
}
