import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { handleAxiosError } from '../helpers/axios-error.helper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsuariosService {
     private readonly baseUrl: string;

     constructor(
          private readonly configService: ConfigService
     ) {
          this.baseUrl = this.configService.get<string>('URL_USUARIOS'); // apunta al microservicio
     }

     async findAll(empresaId: number, page: number = 1, limit: number = 10, search?: string): Promise<any> {
          try {
               const offset = (page - 1) * limit;
               const response = await axios.get(`${this.baseUrl}/usuarios`, {
                    params: { 
                         empresa_id: empresaId, 
                         limit, 
                         offset,
                         search, 
                    },
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async create(data: any): Promise<any> {
          try {
               const response = await axios.post(`${this.baseUrl}/usuarios`, data);
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }

     }

     async update(id: number, data: any): Promise<any> {
          try {
               const response = await axios.patch(`${this.baseUrl}/usuarios/${id}`, data);
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async delete(id: number, empresa_id: number): Promise<any> {
          try {
               const response = await axios.delete(`${this.baseUrl}/usuarios/${id}`, {
                    data: { empresa_id },
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
