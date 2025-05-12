import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'; // Importar Cache correctamente
import { Injectable, HttpException, Inject } from '@nestjs/common';
import axios from 'axios';
import { handleAxiosError } from '../helpers/axios-error.helper';

@Injectable()
export class UsuariosService {
     constructor(
          @Inject(CACHE_MANAGER) private readonly cacheManager: Cache, // Inyectar el servicio de caché
     ) { }

     async login(
          payload: { usuario: string; password: string; empresa_id: number },
          baseUrl: string,
     ): Promise<any> {
          try {

               // Si no están en caché, realizar la solicitud
               const response = await axios.post(
                    `${baseUrl}/autenticacion/iniciar-sesion`,
                    payload,
                    {
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    },
               );
               
               const rolPermisos = response.data.usuario.rol_permisos;
               const key = String(response.data.usuario.id);
               await this.cacheManager.set(key, rolPermisos); 

               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }
}