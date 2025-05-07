import { HttpException } from '@nestjs/common';

export function handleAxiosError(error: any): never {
     if (error.response) {
          // Reenvía el error del microservicio con el mismo código de estado y mensaje
          throw new HttpException(
               {
                    message: error.response.data.message,
                    error: error.response.data.error,
                    statusCode: error.response.status,
               },
               error.response.status
          );
     } else {
          // Manejo de errores genéricos
          throw new HttpException(
               {
                    message: 'Error desconocido al comunicarse con el microservicio',
                    error: 'Internal Server Error',
                    statusCode: 500,
               },
               500
          );
     }
}