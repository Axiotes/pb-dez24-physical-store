import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { ViaCepResponse } from "../interfaces/viacep-response.interface";

export class StoreController {
  public async closerStore(
    req: Request<{ cep: string }>,
    res: Response
  ): Promise<void> {
    const cep: string = req.params.cep;

    try {
      const viaCepRes: AxiosResponse<ViaCepResponse> = await axios.get(
        `https://viacep.com.br/ws/${cep}/json`
      );
      const data = viaCepRes.data;

      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Houve um erro ao obter seu endereço, tente novamente!",
      });
    }
  }
}
