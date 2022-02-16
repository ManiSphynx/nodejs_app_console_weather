const fs = require("fs");
require("dotenv").config();
const axios = require("axios").default;
class Busquedas {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    this.leerDB();
  }

  get historialCapitalizado() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");
      palabras = palabras.map(
        (palabra) => palabra[0].toUpperCase() + palabra.substring(1)
      );

      return palabras.join(" ");
    });
  }

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

  agregarHistorial(lugar = "") {
    if (this.historial.includes(lugar.toLowerCase())) {
      return;
    }

    this.historial = this.historial.splice(0, 5);

    this.historial.unshift(lugar.toLowerCase());

    // Grabar registros
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    const db = fs.existsSync(this.dbPath);

    if (!db) return;

    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });

    const { historial } = JSON.parse(info);

    this.historial = historial;
  }
}

module.exports = Busquedas;
