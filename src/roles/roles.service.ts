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

     async findAll(empresaId: number, page: number = 1, limit: number = 10): Promise<any> {
          try {
               const offset = (page - 1) * limit;
               const response = await axios.get(`${this.baseUrl}/roles`, {
                    params: { empresa_id: empresaId, offset, limit },
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

     async desactivar(id: number, empresa_id: number): Promise<any> {
          try {
               const response = await axios.delete(`${this.baseUrl}/roles/${id}`, {
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