import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { handleAxiosError } from 'src/helpers/axios-error.helper';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesService {
     private readonly baseUrl: string;

     constructor(private readonly configService: ConfigService) {
          this.baseUrl = this.configService.get<string>('URL_USUARIOS'); // apunta al microservicio
     }

     async findAll(empresaId: number): Promise<any> {
          try {
               const response = await axios.get(`${this.baseUrl}/roles`, {
                    params: { empresa_id: empresaId },
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     // async findOne(id: number): Promise<any> {
     //      try {
     //           const response = await axios.get(`${this.baseUrl}/roles/${id}`);
     //           return response.data;
     //      } catch (error) {
     //           handleAxiosError(error);
     //      }
     // }

     async create(data: any): Promise<any> {
          try {
               const response = await axios.post(`${this.baseUrl}/roles`, data);
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async update(id: number, data: any): Promise<any> {
          try {
               const response = await axios.patch(`${this.baseUrl}/roles/${id}`, data);
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async desactivar(id: number): Promise<any> {
          try {
               const response = await axios.delete(`${this.baseUrl}/roles/${id}`);
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async asignarPermisos(id: number, permiso_ids: number[]): Promise<any> {
          try {
               const response = await axios.put(`${this.baseUrl}/roles/${id}/permisos`, {
                    permiso_ids,
               });
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async removerPermisos(id: number, permiso_ids: number[]): Promise<any> {
          try {
               const response = await axios.delete(`${this.baseUrl}/roles/${id}/permisos`, {
                    data: { permiso_ids }, // Axios permite enviar `data` en DELETE
               });
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }
}