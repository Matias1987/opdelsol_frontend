import { useState } from "react";
import { message } from "antd";
import { findClientByDni } from "../services/clienteService";

export const useDniLookup = ({ onClientFound, onClientNotFound }) => {
  const [isSearching, setIsSearching] = useState(false);

  const processScannedDni = async (dniData) => {
    if (!dniData?.dni) {
      message.warning("No se detectó un número de DNI válido");
      return;
    }

    setIsSearching(true);

    try {
      findClientByDni(dniData.dni, (client) => {
        setIsSearching(false);

        if (client) {
          message.success(
            `Cliente encontrado: ${client.apellido}, ${client.nombre}`,
          );
          onClientFound?.(client);
        } else {
          message.info("Cliente nuevo. Por favor complete los datos.");
          onClientNotFound?.(dniData);
        }
      });
    } catch (error) {
      console.error(error);
      message.error("No se pudo verificar el DNI en el servidor");
    } finally {
      setIsSearching(false);
    }
  };

  return {
    processScannedDni,
    isSearching,
  };
};
