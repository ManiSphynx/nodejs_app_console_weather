const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("../helpers/inquirer");
const Busquedas = require("../models/busquedas");

const main = async () => {
  let options = "";
  const search = new Busquedas();

  do {
    options = await inquirerMenu();
    switch (options) {
      case 1:
        const city = await leerInput("Ciudad:");
        const places = await search.ciudad(city);
        const idSelected = await listarLugares(places);
        if (idSelected === "0") continue;
        const placeSelected = places.find((p) => p.id === idSelected);

        // Guardar en db
        search.agregarHistorial(placeSelected.nombre);

        const { nombre, lng, lat } = placeSelected;
        const clima = await search.clima(lat, lng);
        const { temp, temp_min, temp_max } = clima;

        console.log("\nInformacion de la ciudad\n".green);
        console.log("CIUDAD:", nombre);
        console.log("LATITUD:", lat);
        console.log("LONGITUD:", lng);
        console.log("TEMPERATURA:", temp);
        console.log("TEMPERATURA MINIMA:", temp_min);
        console.log("TEMPERATURA MAXIMA:", temp_max);
        break;

      case 2:
        search.historialCapitalizado.forEach((lugar, i) => {
          const id = `${i + 1}.`.green;
          console.log(`${id} ${lugar}`);
        });

        break;

      default:
        break;
    }

    if (options !== 0) await pausa();
  } while (options !== 0);
};

main();
