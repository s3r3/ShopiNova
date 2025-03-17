import { useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function Test() {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  return (
    <div className="container mx-auto p-4 mt-6">
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/3 xl:w-1/3 p-6">
          <h6 className="text-lg font-bold text-gray-600 mb-2">Country</h6>
          <CountrySelect
            onChange={(e) => {
              const state = e as { id: number; name: string };
              setCountryid(state.id);
            }}
            placeHolder="Select Country"
            className="block w-full pl-10 py-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          />
        </div>
        <div className="w-full md:w-1/3 xl:w-1/3 p-6">
          <h6 className="text-lg font-bold text-gray-600 mb-2">State</h6>
          <StateSelect
            disabled={!countryid}
            countryid={countryid}
            onChange={(e) => {
              const state = e as { id: number; name: string };
              setstateid(state.id);
            }}
            placeHolder="Select State"
            className="block w-full pl-10 py-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          />
        </div>
        <div className="w-full md:w-1/3 xl:w-1/3 p-6">
          <h6 className="text-lg font-bold text-gray-600 mb-2">City</h6>
          <CitySelect
            disabled={!stateid}
            countryid={countryid}
            stateid={stateid}
            onChange={(e) => {
              const state = e as { id: number; name: string };
              console.log(state.id);
            }}
            placeHolder="Select City"
            className="block w-full pl-10 py-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default Test;
