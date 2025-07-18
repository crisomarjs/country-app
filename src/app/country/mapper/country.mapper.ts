import type { Country } from "../interfaces/country-interface";
import type { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper{
  static restCountryToCountry(restCountry: RESTCountry): Country{
    return{
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      capital: restCountry.capital.join(','),
      population: restCountry.population,
      coatOfArmsSvg: restCountry.coatOfArms.svg ?? 'No Coat Of Arms',
      borders: restCountry.borders?.join(',') ?? 'No borders'

    }
  }

  static restCountryArrayToCountryArray(restCountry: RESTCountry[]): Country[]{
    return restCountry.map(this.restCountryToCountry)
  }
}
