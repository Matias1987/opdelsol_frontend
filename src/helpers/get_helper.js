// Función auxiliar para pausar la ejecución entre reintentos
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchConRetryYTimeout(url, opciones = {}, timeout = 5000, maxRetries = 3) {
  let retraso = 1000; // Tiempo inicial de espera entre reintentos (1 segundo)

  for (let intento = 1; intento <= maxRetries; intento++) {
    const controller = new AbortController();
    const idTemporizador = setTimeout(() => controller.abort(), timeout);

    try {
      // Intentamos realizar la petición
      const respuesta = await fetch(url, { ...opciones, signal: controller.signal });

      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }

      return await respuesta.json(); // Éxito: devolvemos los datos

    } catch (error) {
      const esUltimoIntento = intento === maxRetries;
      const esAborto = error.name === 'AbortError';

      if (esAborto) {
        console.warn(`Intento ${intento} falló por Timeout (Límite de tiempo).`);
      } else {
        console.warn(`Intento ${intento} falló por error de red: ${error.message}`);
      }

      if (esUltimoIntento) {
        // Si ya no quedan intentos, lanzamos el error definitivo
        throw new Error(`Petición fallida tras ${maxRetries} intentos. Razón original: ${error.message}`);
      }

      // Esperamos antes del próximo intento (multiplicamos por 2 para el backoff exponencial)
      console.log(`Reintentando en ${retraso / 1000} segundos...`);
      await esperar(retraso);
      retraso *= 2; 

    } finally {
      clearTimeout(idTemporizador); // Evitamos fugas de memoria
    }
  }
}

export default fetchConRetryYTimeout;