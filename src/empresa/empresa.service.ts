import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Empresa } from "./entities/empresa.entity";
import axios from "axios";
import { handleAxiosError } from "../helpers/axios-error.helper";

@Injectable()
export class EmpresaService {

     private readonly baseUrl = process.env.URL_USUARIOS || 'http://localhost:3000';

     
     
     async findAll(page: number = 1, limit: number = 10): Promise<{ data: any[]; total: number }> {
          console.log(this.baseUrl)
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