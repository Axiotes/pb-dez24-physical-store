import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { ViaCepResponse } from "../interfaces/viacep-response.interface";
import * as dotenv from "dotenv";
import connection from "../db/connection";
import { Store } from "../interfaces/store.interface";
import { Location } from "../interfaces/location.interface";
import { RouteInfo } from "../interfaces/route-info.interface";
import logger from "../helpers/logger";
import successLog from "../helpers/success-log";
import errorLog from "../helpers/error-log";

dotenv.config();

export class StoreController {
  public closerStore = async (
    req: Request<{ cep: string }>,
    res: Response
  ): Promise<void> => {
    const startTime = new Date();
    const cep: string = req.params.cep;
    const apiKey: string | undefined = process.env.API_KEY;

    try {
      if (!apiKey) {
        throw new Error("API Key undefined");
      }

      const address: string = await this.getAddress(cep);
      const location: Location = await this.getCoordinateLocation(
        address,
        apiKey
      );
      const stores: Store[] = await this.getStores();

      let closers: {
        store: Store;
        distance: RouteInfo;
        duration: RouteInfo;
      }[] = [];

      for (let i = 0; i < stores.length; i++) {
        const store = stores[i];

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
            distance,
            duration,
          });
        }
      }

      closers = closers.sort((a, b) => a.distance.value - b.distance.value);

      const response =
        closers.length === 0
          ? {
              status: "success",
              message: "Não há nenhuma loja a 100km de você",
            }
          : { status: "success", data: closers };

      successLog({
        method: req.method,
        url: req.url,
        params: req.params,
        body: req.body,
        executionTime: `${new Date().getTime() - startTime.getTime()}ms`,
      });

      res.status(200).send(response);
    } catch (err) {
      errorLog({
        method: req.method,
        url: req.url,
        params: req.params,
        body: req.body,
        executionTime: `${new Date().getTime() - startTime.getTime()}ms`,
        error: err,
      });
      res.status(500).send({
        status: "fail",
        message:
          "Houve um erro ao procuras lojas mais próximas, tente novamente!",
      });
    }
  };

  private async getCoordinateLocation(
    address: string,
    apiKey: string
  ): Promise<Location> {
    const geocodeRes = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );

    return geocodeRes.data.results[0].geometry.location;
  }

  private async getAddress(cep: string): Promise<string> {
    const viaCepRes: AxiosResponse<ViaCepResponse> = await axios.get(
      `https://viacep.com.br/ws/${cep}/json`
    );
    const data = viaCepRes.data;

    return `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
  }

  private async getStores(): Promise<Store[]> {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM stores", (err: any, result: Store[]) => {
        if (err) {
          return reject(err);
        }

        resolve(result);
      });
    });
  }
}
