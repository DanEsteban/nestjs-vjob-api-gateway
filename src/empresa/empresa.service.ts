import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as fs from 'fs';
import FormData from 'form-data';
import { handleAxiosError } from "../helpers/axios-error.helper";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class EmpresaService {

     private readonly baseUrl: string;

     constructor(
          private readonly configService: ConfigService,
     ) {
          this.baseUrl = this.configService.get<string>('URL_USUARIOS');
     }

     async create(
          data: any,
          file?: Express.Multer.File,
     ): Promise<any> {

          const formData = new FormData();

          for (const key in data) {
               const value = data[key];
               if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
               }
          }

          if (file) {
               const fileStream = fs.createReadStream(file.path);
               formData.append('logo', fileStream, file.originalname);
          }

          try {
               const response = await axios.post(`${this.baseUrl}/empresas`, formData, {
                    headers: {
                         ...formData.getHeaders(),
                    },
               });
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async activarEmpresa(id: number): Promise<any> {
          try {
               const response = await axios.patch(`${this.baseUrl}/empresas/${id}/activar`, {}, {
                    headers: { 'Content-Type': 'application/json' },
               });
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }

     }

     async desactivarEmpresa(id: number): Promise<any> {
          try {
               const response = await axios.patch(`${this.baseUrl}/empresas/${id}/desactivar`, {
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async listarEmpresas(page: number = 1, limit: number = 10): Promise<{ data: any[]; total: number }> {
          try {
               const response = await axios.get(`${this.baseUrl}/empresas`, {
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

     async asignarModulos(data: any): Promise<any> {
          try {
               const response = await axios.post(`${this.baseUrl}/empresas/modulos`, data);
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async actualizarEmpresa(
          id: number,
          data: any,
          file?: Express.Multer.File,
     ): Promise<any> {
          const formData = new FormData();

          // Añadir campos del data
          for (const key in data) {
               const value = data[key];
               if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
               }
          }

          // Adjuntar archivo si existe
          if (file) {
               const fileStream = fs.createReadStream(file.path);
               formData.append('logo', fileStream, file.originalname);
          }

          const headers = {
               ...formData.getHeaders(),
          };

          try {
               const response = await axios.put(
                    `${this.baseUrl}/empresas/${id}`,
                    formData,
                    { headers },
               );
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }
}