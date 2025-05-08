import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as fs from 'fs';
import * as FormData from 'form-data';
import { handleAxiosError } from "../helpers/axios-error.helper";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmpresaService {

     private readonly baseUrl: string;

     constructor(private readonly configService: ConfigService) {
          this.baseUrl = this.configService.get<string>('URL_USUARIOS');
     }

     async findAll(page: number = 1, limit: number = 10): Promise<{ data: any[]; total: number }> {
          try {
               const response = await axios.get(`${this.baseUrl}/empresa`, {
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

     async create(
          data: any,
          file?: Express.Multer.File,
     ): Promise<any> {
          const formData = new FormData();

          for (const key in data) {
               formData.append(key, data[key]);
          }

          if (file && fs.existsSync(file.path)) {
               const fileStream = fs.createReadStream(file.path); // Crear un ReadStream
               formData.append('logo', fileStream, file.originalname); // Agregar el archivo al FormData
          }

          try {
               const response = await axios.post(`${this.baseUrl}/empresa`, formData, {
                    headers: {
                         ...formData.getHeaders(),
                    },
               });
               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

     async update(
          id: string,
          data: any,
          file?: Express.Multer.File,
     ): Promise<any> {
          const formData = new FormData();

          // Añadir campos del data
          for (const key in data) {
               formData.append(key, data[key]);
          }

          // Adjuntar archivo si existe
          if (file) {
               const fileStream = fs.createReadStream(file.path);
               formData.append('logo', fileStream, file.originalname);
          }

          const headers = {
               ...formData.getHeaders(),
          };

          const response = await axios.put(
               `${this.baseUrl}/empresa/${id}`,
               formData,
               { headers },
          );

          return response.data;
     }

     async delete(id: string): Promise<any> {
          try {
               const response = await axios.delete(`${this.baseUrl}/empresa/${id}`, {
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