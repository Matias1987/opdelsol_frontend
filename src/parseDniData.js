export const parseDniString = (rawString) => {
  if (!rawString || typeof rawString !== 'string' || !rawString.includes('@')) {
    return null;
  }

  // Dividimos por '@' y aplicamos .trim() a cada string individual del arreglo
  const parts = rawString.split('@').map((part) => part.trim());

  // Formato actual (DNI tarjeta estándar: 8 o 9 campos, no empieza con @)
  // Ejemplo: 00482910452@GOMEZ@JUAN CARLOS@M@34567890@A@15/04/1989@10/06/2021@203
  if (parts.length >= 8 && parts[0] !== '') {
    return {
      tramite: parts[0],
      apellido: parts[1],
      nombre: parts[2],
      sexo: parts[3],
      dni: parts[4],
      ejemplar: parts[5],
      fechaNacimiento: parts[6],
      fechaEmision: parts[7],
    };
  }

  // Formato anterior (DNI tarjeta viejo: empieza con '@', por lo que parts[0] es vacío)
  // Ejemplo: @28456123@A@1@LOPEZ@ROBERTO DANIEL@ARGENTINA@12/03/1981@M@15/05/2012@00129384756@7019
  if (parts.length >= 10 && parts[0] === '') {
    return {
      dni: parts[1],
      ejemplar: parts[2],
      apellido: parts[4],
      nombre: parts[5],
      sexo: parts[8],
      fechaNacimiento: parts[7],
      fechaEmision: parts[9],
      tramite: parts[10] || '',
    };
  }

  return null;
};
