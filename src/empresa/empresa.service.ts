import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Empresa } from "./entities/empresa.entity";
import axios from "axios";
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

}