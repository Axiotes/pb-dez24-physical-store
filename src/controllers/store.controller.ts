import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { ViaCepResponse } from "../interfaces/viacep-response.interface";
import * as dotenv from "dotenv";
import connection from "../db/connection";
import { Store } from "../interfaces/store.interface";
import { Location } from "../interfaces/location.interface";
import { RouteInfo } from "../interfaces/route-info.interface";

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

      const stores: Store[] = await this.getStores();
      let closers: { store: Store; distance: string; duration: string }[] = [];

      for (let i = 0; i <= stores.length; i++) {
        const store = stores[i];

        if (!store) {
          continue;
        }

        const directionsRes = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${location.lat},${location.lng}&destination=${store.lat},${store.lng}&key=${apiKey}`
        );

        const distance: RouteInfo =
          directionsRes.data.routes[0].legs[0].distance;
        const duration: RouteInfo =
          directionsRes.data.routes[0].legs[0].duration;

        if (distance.value <= 100000) {
          closers.push({
            store,
            distance: distance.text,
            duration: duration.text,
          });
        }
      }

      res.send(closers);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Houve um erro ao obter seu endereço, tente novamente!",
      });
    }
  };

  private async getStores(): Promise<Store[]> {
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
