import fetchConRetryYTimeout from "../helpers/get_helper";
import { post_method } from "../helpers/post_helper";
import { get, post } from "../urls";

export const findClientByDni = (dni, callback) => {
  post_method(post.obtener_cliente_dni, { dni: dni }, (response) => {
    
    callback(response.data.length > 0 ? response.data[0] : null);
  });
};

export const findClientById = async (id) => {
  const response = await fetchConRetryYTimeout(get.cliente_por_id, { id });

  if (response.status === 404) {
    return null; // El cliente no existe
  }

  if (!response.ok) {
    throw new Error("Error al consultar el cliente en el servidor");
  }

  return await response.json(); // Devuelve el objeto cliente existente
};
