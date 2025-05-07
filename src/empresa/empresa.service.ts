import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Empresa } from "./entities/empresa.entity";
import axios from "axios";
import { handleAxiosError } from "../helpers/axios-error.helper";

@Injectable()
export class EmpresaService {

     private readonly baseUrl = process.env.BASE_URL;

     async findAll(page: number = 1, limit: number = 10): Promise<any> {
          try {
               const response = await axios.get(`${this.baseUrl}/empresa`, {
                    params: { page, limit },
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });
               console.log(response.data)

               return response.data;
          } catch (error) {
               handleAxiosError(error);
          }
     }

}