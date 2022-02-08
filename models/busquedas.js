require("dotenv").config();
const axios = require("axios").default;
class Busquedas {
  constructor() {}

  get paramsMapBox() {
    return {
      access_token: `${process.env.MAPBOXTOKEN}`,
      limit: 5,
      language: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      const intance = axios.create({
        baseURL: `${process.env.MAPBOXURL}`,
        params: this.paramsMapBox,
      });

      const resp = await intance.get(
        `geocoding/v5/mapbox.places/${lugar}.json`
      );

      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      throw new Error(error);
    }
  }

  async clima(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `${process.env.WATHERURL}`,
        params: {
          lat,
          lon,
          appid: `${process.env.WATHERKEY}`,
        },
      });

      const resp = await instance.get("data/2.5/weather");

      return resp.data.main;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Busquedas;
