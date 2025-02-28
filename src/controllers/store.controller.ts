import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { ViaCepResponse } from "../interfaces/viacep-response.interface";
import * as dotenv from "dotenv";
import connection from "../db/connection";
import { Store } from "../interfaces/store.interface";

dotenv.config();

export class StoreController {
  public closerStore = async (
    req: Request<{ cep: string }>,
    res: Response
  ): Promise<void> => {
    const cep: string = req.params.cep;
    const apiKey = process.env.API_KEY;

    try {
      const viaCepRes: AxiosResponse<ViaCepResponse> = await axios.get(
        `https://viacep.com.br/ws/${cep}/json`
      );
      const data = viaCepRes.data;

      const address = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;

      const geocodeRes = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );
      const location: Location = geocodeRes.data.results[0].geometry.location;

      const results: Store[] = await this.getStoreLocations();
      console.log(results);

      res.send(geocodeRes.data.results[0].geometry.location);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Houve um erro ao obter seu endereço, tente novamente!",
      });
    }
  };

  private async getStoreLocations(): Promise<Store[]> {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM stores", (err: any, result: Store[]) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        resolve(result);
      });
    });
  }
}
