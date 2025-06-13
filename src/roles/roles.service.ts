import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { handleAxiosError } from 'src/helpers/axios-error.helper';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import e from 'express';

@Injectable()
export class RolesService {
     private readonly baseUrl: string;

     constructor(private readonly configService: ConfigService) {
          this.baseUrl = this.configService.get<string>('URL_USUARIOS'); // apunta al microservicio
     }

     async crearRol(data: any): Promise<any> {
          try {
               const response = await axios.post(`${this.baseUrl}/roles`, data);
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async listarPorEmpresa(empresa_id: number): Promise<any> {
          try {
               const response = await axios.get(`${this.baseUrl}/roles`, {
                    params: { empresa_id },
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }


     // async listarPorEmpresa(empresaId: number, page: number = 1, limit: number = 10): Promise<any> {
     //      try {
     //           const response = await axios.get(`${this.baseUrl}/roles/empresa`, {
     //                params: { empresaId, page, limit },
     //                headers: {
     //                     'Content-Type': 'application/json',
     //                },
     //           });
     //           return response.data;
     //      } catch (error) {
     //           handleAxiosError(error);
     //      }
     // }

     // async asignarPermisos(rolId: number, data: { permiso_ids: number[] }): Promise<any> {
     //      try {
     //           const response = await axios.put(`${this.baseUrl}/roles/${rolId}/permisos`, data);
     //           return response.data;
     //      } catch (error) {
     //           handleAxiosError(error);
     //      }
     // }

     // async obtenerModulosEmpresa(empresa_id: number): Promise<any[]> {

     //      try {
     //           const response = await axios.get(`${this.baseUrl}/modulos`, {
     //                params: { empresa_id },
     //                headers: {
     //                     'Content-Type': 'application/json',
     //                },
     //           });
     //           return response.data;
     //      } catch (error) {
     //           handleAxiosError(error);

     //      }

     // }

     // async obtenerPermisosPorModulos(modulosIds: number[]): Promise<any[]> {

     //      try {
     //           const response = await axios.get(`${this.baseUrl}/permisos`, { params: { modulosIds: modulosIds.join(',') } });
     //           return response.data.data;

     //      } catch (error) {
     //           handleAxiosError(error);
     //      }
     // }

     // async obtenerPermisos(data: any, page: number = 1, limit: number = 10): Promise<any> {
     //      try {
     //           const response = await axios.get(`${this.baseUrl}/roles/permisos`, {
     //                params: { ...data, page, limit },
     //                headers: {
     //                     'Content-Type': 'application/json',
     //                },
     //           });
     //           return response.data;
     //      } catch (error) {
     //           handleAxiosError(error);
     //      }
     // }

}

