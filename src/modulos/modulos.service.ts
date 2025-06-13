import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { handleAxiosError } from 'src/helpers/axios-error.helper';

@Injectable()
export class ModulosService {
     private readonly baseUrl: string;

     constructor(
          private readonly configService: ConfigService,
     ) {
          this.baseUrl = this.configService.get<string>('URL_USUARIOS');
     }

     async obtenerModulosEmpresa(
          empresa_id: number,
          page: number = 1,
          limit: number = 10,
     ): Promise<any> {
          try {
               const response = await axios.get(`${this.baseUrl}/modulos/empresa`, {
                    params: { empresa_id, page, limit },
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async obtenerModulos(
          page: number = 1,
          limit: number = 10,
     ): Promise<any> {
          try {
               const response = await axios.get(`${this.baseUrl}/modulos`, {
                    params: { page, limit },
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }
}
