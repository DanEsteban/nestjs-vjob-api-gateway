import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { handleAxiosError } from 'src/helpers/axios-error.helper';

@Injectable()
export class PermisosService {
     private readonly baseUrl: string;

     constructor(
          private readonly configService: ConfigService,
     ) {
          this.baseUrl = this.configService.get<string>('URL_USUARIOS');
     }

     async listar(modulo?: string, page: number = 1, limit: number = 10): Promise<{ data: any[]; total: number }> {
          try {
               const response = await axios.get(`${this.baseUrl}/permisos`, {
                    params: { modulo, page, limit },
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
