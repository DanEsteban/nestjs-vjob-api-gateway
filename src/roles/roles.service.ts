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

     async create(data: any): Promise<any> {
          try {
               const response = await axios.post(`${this.baseUrl}/roles`, data);
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async asignarPermisos(rolId: number, data: { permiso_ids: number[] }): Promise<any> {
          try {
               const response = await axios.put(`${this.baseUrl}/roles/${rolId}/permisos`, data);
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async obtenerPermisos(rolId: number, page: number = 1, limit: number = 10): Promise<any> {
          try {
               const response = await axios.get(`${this.baseUrl}/roles/${rolId}/permisos`, {
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

     async listarPorEmpresa(empresaId: number, page: number = 1, limit: number = 10): Promise<any> {
          try {
               const response = await axios.get(`${this.baseUrl}/roles/empresa`, {
                    params: { empresaId, page, limit },
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