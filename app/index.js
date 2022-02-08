const { leerInput, inquirerMenu, pausa } = require("../helpers/inquirer");
const busquedas = require("../models/busquedas");

const main = async () => {
  let options = "";
  const search = busquedas();

  do {
    options = await inquirerMenu();
    switch (options) {
      case 1:
        // show message
        const city = await leerInput("Ciudad:");
        console.log(city);

        // search city

        // select city

        // Clima

        // show results
        console.log("\nInformacion de la ciudad\n".green);
        console.log("CIUDAD:");
        console.log("LATITUD:");
        console.log("LONGITUD:");
        console.log("TEMPERATURA:");
        console.log("TEMPERATURA MINIMA:");
        console.log("TEMPERATURA MAXIMA:");
        break;

      default:
        break;
    }

    if (options !== 0) await pausa();
  } while (options !== 0);
};

main();
