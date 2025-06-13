import { useContext, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CartContext } from "../../../components/context/CartContext";
import { form } from "@heroui/react";
import { RadioGroup, Radio } from "@heroui/react";
export const Entrega = () => {
  const { handleContinuar } = useOutletContext();
  const { setFormdata, formdata, handleOnChange } = useContext(CartContext);

  console.log("Data:", formdata);
  return (
    <div className="min-h-screen flex flex-col gap-5 justify-center items-center">
      <div className="flex relative items-center gap-2">
        <label>Retiro por local</label>
        <input
          className="w-5 h-5  accent-purple-600"
          type="radio"
          name="tipoEntrega"
          value="Retiro"
          checked={formdata.tipoEntrega === "Retiro"}
          onChange={handleOnChange}
        />
        <label>Envio</label>
        <input
          className="w-5 h-5  accent-purple-600"
          type="radio"
          name="tipoEntrega"
          value="Envio"
          checked={formdata.tipoEntrega === "Envio"}
          onChange={handleOnChange}
        />
        {formdata.tipoEntrega === "Envio" && (
          <div className="flex absolute top-0 left-[250px] flex-col items-center gap-4 bg-black/90 p-4">
            <h2>Tu direccion</h2>
            <input
              name="domicilio"
              className="bg-transparent border-b-1 border-b-gray-600 focus:border-b-white outline-none text-sky-500 transition-all duration-200 placeholder:text-sm placeholder:text-gray-700 ease-in-out "
              type="text"
              value={formdata.domicilio}
              placeholder="Domicilio"
              onChange={handleOnChange}
            />

            <RadioGroup
              color="primary"
              label="Selecciona tu localidad"
              name="localidad"
            >
              <Radio onChange={handleOnChange} value="Rawson" name="localidad">
                <h5 className="text-white">Rawson</h5>
              </Radio>
              <Radio
                onChange={handleOnChange}
                value="Villa Krause"
                name="localidad"
              >
                <h5 className="text-white">Villa Krause</h5>
              </Radio>
              <Radio
                onChange={handleOnChange}
                value="Rivadavia"
                name="localidad"
              >
                <h5 className="text-white">Rivadavia</h5>
              </Radio>
              <Radio onChange={handleOnChange} value="Chimbas" name="localidad">
                <h5 className="text-white">Chimbas</h5>
              </Radio>
              <Radio
                onChange={handleOnChange}
                value="Santa Lucia"
                name="localidad"
              >
                <h5 className="text-white">Santa Lucia</h5>
              </Radio>
              <Radio onChange={handleOnChange} value="Capital" name="localidad">
                <h5 className="text-white">Capital</h5>
              </Radio>
              <Radio
                onChange={handleOnChange}
                value="Albardon"
                name="localidad"
              >
                <h5 className="text-white">Albardon</h5>
              </Radio>
            </RadioGroup>

            <input
              className="bg-transparent border-b-1 border-b-gray-600 focus:border-b-white outline-none text-sky-500  transition-all duration-200 placeholder:text-sm placeholder:text-gray-700 ease-in-out "
              type="number"
              name="codigoPostal"
              value={formdata.codigoPostal}
              onChange={handleOnChange}
              placeholder="Codigo Postal"
            />

            <button
              onClick={handleContinuar}
              className="bg-sky-500 font-semibold p-2 w-[200px] hover:text-black scale-90 hover:scale-100 transition-all ease-in duration-200"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
      {formdata.tipoEntrega === "Retiro" && (
        <button
          onClick={handleContinuar}
          className="bg-sky-500 p-2 font-semibold hover:text-black scale-90 hover:scale-100 ease-in duration-200 transition-all w-[200px]"
        >
          Continuar
        </button>
      )}
    </div>
  );
};
