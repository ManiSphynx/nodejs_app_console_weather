const axios = require("axios");
require("dotenv").config();
const token = process.env.MAPBOXTOKEN;
class Busquedas {
  constructor() {}

  async ciudad(lugar = "") {
    try {
      const respuesta = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/moreli.json?language=es&access_token=${token}`
      );
      console.log(respuesta.data);
      return [];
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Busquedas;
