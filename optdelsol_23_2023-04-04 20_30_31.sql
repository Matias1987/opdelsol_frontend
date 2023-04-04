-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.32 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para optdelsol_23
CREATE DATABASE IF NOT EXISTS `optdelsol_23` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `optdelsol_23`;

-- Volcando estructura para tabla optdelsol_23.banco
CREATE TABLE IF NOT EXISTS `banco` (
  `idbanco` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idbanco`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.caja
CREATE TABLE IF NOT EXISTS `caja` (
  `idcaja` int NOT NULL AUTO_INCREMENT,
  `sucursal_idsucursal` int NOT NULL,
  `fecha` varchar(45) DEFAULT NULL,
  `monto_inicial` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcaja`),
  KEY `fk_caja_sucursal1_idx` (`sucursal_idsucursal`),
  CONSTRAINT `fk_caja_sucursal1` FOREIGN KEY (`sucursal_idsucursal`) REFERENCES `sucursal` (`idsucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.carga_manual
CREATE TABLE IF NOT EXISTS `carga_manual` (
  `idcarga_manual` int NOT NULL AUTO_INCREMENT,
  `caja_idcaja` int NOT NULL,
  `usuario_idusuario` int NOT NULL,
  `cliente_idcliente` int NOT NULL,
  `sucursal_idsucursal` int NOT NULL,
  `monto` varchar(45) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `fecha_alta` datetime DEFAULT CURRENT_TIMESTAMP,
  `concepto` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcarga_manual`),
  KEY `fk_carga_manual_caja1_idx` (`caja_idcaja`),
  KEY `fk_carga_manual_usuario1_idx` (`usuario_idusuario`),
  KEY `fk_carga_manual_cliente1_idx` (`cliente_idcliente`),
  KEY `fk_carga_manual_sucursal1_idx` (`sucursal_idsucursal`),
  CONSTRAINT `fk_carga_manual_caja1` FOREIGN KEY (`caja_idcaja`) REFERENCES `caja` (`idcaja`),
  CONSTRAINT `fk_carga_manual_cliente1` FOREIGN KEY (`cliente_idcliente`) REFERENCES `cliente` (`idcliente`),
  CONSTRAINT `fk_carga_manual_sucursal1` FOREIGN KEY (`sucursal_idsucursal`) REFERENCES `sucursal` (`idsucursal`),
  CONSTRAINT `fk_carga_manual_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.cliente
CREATE TABLE IF NOT EXISTS `cliente` (
  `idcliente` int NOT NULL AUTO_INCREMENT,
  `localidad_idlocalidad` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `dni` varchar(45) DEFAULT NULL,
  `telefono1` varchar(45) DEFAULT NULL,
  `telefono2` varchar(45) DEFAULT NULL,
  `bloqueado` int DEFAULT '0',
  PRIMARY KEY (`idcliente`),
  KEY `fk_cliente_localidad1_idx` (`localidad_idlocalidad`),
  CONSTRAINT `fk_cliente_localidad1` FOREIGN KEY (`localidad_idlocalidad`) REFERENCES `localidad` (`idlocalidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.cobro
CREATE TABLE IF NOT EXISTS `cobro` (
  `idcobro` int NOT NULL AUTO_INCREMENT,
  `caja_idcaja` int NOT NULL,
  `usuario_idusuario` int NOT NULL,
  `cliente_idcliente` int NOT NULL,
  `venta_idventa` int DEFAULT NULL,
  `fecha_alta` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha` datetime DEFAULT NULL,
  `monto` varchar(45) DEFAULT NULL,
  `tipo` varchar(8) DEFAULT 'CIE_OP',
  PRIMARY KEY (`idcobro`),
  KEY `fk_cobro_caja1_idx` (`caja_idcaja`),
  KEY `fk_cobro_usuario1_idx` (`usuario_idusuario`),
  KEY `fk_cobro_cliente1_idx` (`cliente_idcliente`),
  KEY `fk_cobro_venta1_idx` (`venta_idventa`),
  CONSTRAINT `fk_cobro_caja1` FOREIGN KEY (`caja_idcaja`) REFERENCES `caja` (`idcaja`),
  CONSTRAINT `fk_cobro_cliente1` FOREIGN KEY (`cliente_idcliente`) REFERENCES `cliente` (`idcliente`),
  CONSTRAINT `fk_cobro_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`),
  CONSTRAINT `fk_cobro_venta1` FOREIGN KEY (`venta_idventa`) REFERENCES `venta` (`idventa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.cobro_has_modo_pago
CREATE TABLE IF NOT EXISTS `cobro_has_modo_pago` (
  `cobro_idcobro` int NOT NULL,
  `modo_pago_idmodo_pago` int NOT NULL,
  `banco_idbanco` int DEFAULT NULL,
  `mutual_idmutual` int DEFAULT NULL,
  `monto` varchar(45) DEFAULT NULL,
  `cant_cuotas` varchar(45) DEFAULT NULL,
  `monto_cuota` varchar(45) DEFAULT NULL,
  `total_int` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cobro_idcobro`,`modo_pago_idmodo_pago`),
  KEY `fk_cobro_has_modo_pago_modo_pago1_idx` (`modo_pago_idmodo_pago`),
  KEY `fk_cobro_has_modo_pago_cobro1_idx` (`cobro_idcobro`),
  KEY `fk_cobro_has_modo_pago_banco1_idx` (`banco_idbanco`),
  KEY `fk_cobro_has_modo_pago_mutual1_idx` (`mutual_idmutual`),
  CONSTRAINT `fk_cobro_has_modo_pago_banco1` FOREIGN KEY (`banco_idbanco`) REFERENCES `banco` (`idbanco`),
  CONSTRAINT `fk_cobro_has_modo_pago_cobro1` FOREIGN KEY (`cobro_idcobro`) REFERENCES `cobro` (`idcobro`),
  CONSTRAINT `fk_cobro_has_modo_pago_modo_pago1` FOREIGN KEY (`modo_pago_idmodo_pago`) REFERENCES `modo_pago` (`idmodo_pago`),
  CONSTRAINT `fk_cobro_has_modo_pago_mutual1` FOREIGN KEY (`mutual_idmutual`) REFERENCES `mutual` (`idmutual`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.codigo
CREATE TABLE IF NOT EXISTS `codigo` (
  `idcodigo` int NOT NULL AUTO_INCREMENT,
  `subgrupo_idsubgrupo` int NOT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `costo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0',
  PRIMARY KEY (`idcodigo`),
  KEY `fk_codigo_subgrupo1_idx` (`subgrupo_idsubgrupo`),
  CONSTRAINT `fk_codigo_subgrupo1` FOREIGN KEY (`subgrupo_idsubgrupo`) REFERENCES `subgrupo` (`idsubgrupo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.concepto_gasto
CREATE TABLE IF NOT EXISTS `concepto_gasto` (
  `idconcepto_gasto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idconcepto_gasto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.envio
CREATE TABLE IF NOT EXISTS `envio` (
  `idenvio` int NOT NULL AUTO_INCREMENT,
  `sucursal_idsucursal` int NOT NULL,
  `usuario_idusuario` int NOT NULL,
  `cantidad_total` int DEFAULT '0',
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idenvio`),
  KEY `fk_envio_sucursal1_idx` (`sucursal_idsucursal`),
  KEY `fk_envio_usuario1_idx` (`usuario_idusuario`),
  CONSTRAINT `fk_envio_sucursal1` FOREIGN KEY (`sucursal_idsucursal`) REFERENCES `sucursal` (`idsucursal`),
  CONSTRAINT `fk_envio_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.envio_has_stock
CREATE TABLE IF NOT EXISTS `envio_has_stock` (
  `envio_idenvio` int NOT NULL,
  `stock_sucursal_idsucursal` int NOT NULL,
  `stock_codigo_idcodigo` int NOT NULL,
  `cantidad` int DEFAULT '0',
  PRIMARY KEY (`envio_idenvio`,`stock_sucursal_idsucursal`,`stock_codigo_idcodigo`),
  KEY `fk_envio_has_stock_stock1_idx` (`stock_sucursal_idsucursal`,`stock_codigo_idcodigo`),
  KEY `fk_envio_has_stock_envio1_idx` (`envio_idenvio`),
  CONSTRAINT `fk_envio_has_stock_envio1` FOREIGN KEY (`envio_idenvio`) REFERENCES `envio` (`idenvio`),
  CONSTRAINT `fk_envio_has_stock_stock1` FOREIGN KEY (`stock_sucursal_idsucursal`, `stock_codigo_idcodigo`) REFERENCES `stock` (`sucursal_idsucursal`, `codigo_idcodigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.factura
CREATE TABLE IF NOT EXISTS `factura` (
  `idfactura` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `proveedor_idproveedor` int NOT NULL,
  PRIMARY KEY (`idfactura`) USING BTREE,
  KEY `fk_factura_proveedor1_idx` (`proveedor_idproveedor`) USING BTREE,
  CONSTRAINT `fk_factura_proveedor1` FOREIGN KEY (`proveedor_idproveedor`) REFERENCES `proveedor` (`idproveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.familia
CREATE TABLE IF NOT EXISTS `familia` (
  `idfamilia` int NOT NULL AUTO_INCREMENT,
  `nombre_corto` varchar(45) DEFAULT NULL,
  `nombre_largo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idfamilia`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.gasto
CREATE TABLE IF NOT EXISTS `gasto` (
  `idgasto` int NOT NULL AUTO_INCREMENT,
  `caja_idcaja` int NOT NULL,
  `usuario_idusuario` int NOT NULL,
  `concepto_gasto_idconcepto_gasto` int NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `fecha_alta` datetime DEFAULT CURRENT_TIMESTAMP,
  `monto` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idgasto`),
  KEY `fk_gasto_caja1_idx` (`caja_idcaja`),
  KEY `fk_gasto_usuario1_idx` (`usuario_idusuario`),
  KEY `fk_gasto_concepto_gasto1_idx` (`concepto_gasto_idconcepto_gasto`),
  CONSTRAINT `fk_gasto_caja1` FOREIGN KEY (`caja_idcaja`) REFERENCES `caja` (`idcaja`),
  CONSTRAINT `fk_gasto_concepto_gasto1` FOREIGN KEY (`concepto_gasto_idconcepto_gasto`) REFERENCES `concepto_gasto` (`idconcepto_gasto`),
  CONSTRAINT `fk_gasto_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.grupo
CREATE TABLE IF NOT EXISTS `grupo` (
  `idgrupo` int NOT NULL AUTO_INCREMENT,
  `subfamilia_idsubfamilia` int NOT NULL,
  `nombre_corto` varchar(45) DEFAULT NULL,
  `nombre_largo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idgrupo`),
  KEY `fk_grupo_subfamilia1_idx` (`subfamilia_idsubfamilia`),
  CONSTRAINT `fk_grupo_subfamilia1` FOREIGN KEY (`subfamilia_idsubfamilia`) REFERENCES `subfamilia` (`idsubfamilia`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.localidad
CREATE TABLE IF NOT EXISTS `localidad` (
  `idlocalidad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idlocalidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.medico
CREATE TABLE IF NOT EXISTS `medico` (
  `idmedico` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `matricula` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idmedico`),
  UNIQUE KEY `_matricula` (`matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.modo_pago
CREATE TABLE IF NOT EXISTS `modo_pago` (
  `idmodo_pago` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idmodo_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.mutual
CREATE TABLE IF NOT EXISTS `mutual` (
  `idmutual` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idmutual`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.proveedor
CREATE TABLE IF NOT EXISTS `proveedor` (
  `idproveedor` int NOT NULL AUTO_INCREMENT,
  `cuit` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `nombre` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`idproveedor`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.stock
CREATE TABLE IF NOT EXISTS `stock` (
  `sucursal_idsucursal` int NOT NULL,
  `codigo_idcodigo` int NOT NULL,
  `cantidad` int DEFAULT '0',
  PRIMARY KEY (`sucursal_idsucursal`,`codigo_idcodigo`),
  KEY `fk_sucursal_has_codigo_codigo1_idx` (`codigo_idcodigo`),
  KEY `fk_sucursal_has_codigo_sucursal1_idx` (`sucursal_idsucursal`),
  CONSTRAINT `fk_sucursal_has_codigo_codigo1` FOREIGN KEY (`codigo_idcodigo`) REFERENCES `codigo` (`idcodigo`),
  CONSTRAINT `fk_sucursal_has_codigo_sucursal1` FOREIGN KEY (`sucursal_idsucursal`) REFERENCES `sucursal` (`idsucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.stock_factura
CREATE TABLE IF NOT EXISTS `stock_factura` (
  `idstock_factura` int NOT NULL,
  `stock_sucursal_idsucursal` int NOT NULL,
  `stock_codigo_idcodigo` int NOT NULL,
  `factura_idfactura` int NOT NULL,
  `cantidad` int DEFAULT '0',
  `costo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idstock_factura`) USING BTREE,
  KEY `fk_stock_has_factura_factura1_idx` (`factura_idfactura`) USING BTREE,
  KEY `fk_stock_has_factura_stock1_idx` (`stock_sucursal_idsucursal`,`stock_codigo_idcodigo`) USING BTREE,
  CONSTRAINT `fk_stock_has_factura_factura1` FOREIGN KEY (`factura_idfactura`) REFERENCES `factura` (`idfactura`),
  CONSTRAINT `fk_stock_has_factura_stock1` FOREIGN KEY (`stock_sucursal_idsucursal`, `stock_codigo_idcodigo`) REFERENCES `stock` (`sucursal_idsucursal`, `codigo_idcodigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.subfamilia
CREATE TABLE IF NOT EXISTS `subfamilia` (
  `idsubfamilia` int NOT NULL AUTO_INCREMENT,
  `familia_idfamilia` int NOT NULL,
  `nombre_corto` varchar(45) DEFAULT NULL,
  `nombre_largo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idsubfamilia`),
  KEY `fk_subfamilia_familia1_idx` (`familia_idfamilia`),
  CONSTRAINT `fk_subfamilia_familia1` FOREIGN KEY (`familia_idfamilia`) REFERENCES `familia` (`idfamilia`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.subgrupo
CREATE TABLE IF NOT EXISTS `subgrupo` (
  `idsubgrupo` int NOT NULL AUTO_INCREMENT,
  `grupo_idgrupo` int NOT NULL,
  `nombre_corto` varchar(45) DEFAULT NULL,
  `nombre_largo` varchar(45) DEFAULT NULL,
  `multiplicador` varchar(50) DEFAULT '1',
  PRIMARY KEY (`idsubgrupo`),
  KEY `fk_subgrupo_grupo1_idx` (`grupo_idgrupo`),
  CONSTRAINT `fk_subgrupo_grupo1` FOREIGN KEY (`grupo_idgrupo`) REFERENCES `grupo` (`idgrupo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.sucursal
CREATE TABLE IF NOT EXISTS `sucursal` (
  `idsucursal` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idsucursal`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.tipo_permisos
CREATE TABLE IF NOT EXISTS `tipo_permisos` (
  `idtipo_permisos` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idtipo_permisos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.usuario_has_tipo_permisos
CREATE TABLE IF NOT EXISTS `usuario_has_tipo_permisos` (
  `usuario_idusuario` int NOT NULL,
  `tipo_permisos_idtipo_permisos` int NOT NULL,
  PRIMARY KEY (`usuario_idusuario`,`tipo_permisos_idtipo_permisos`),
  KEY `fk_usuario_has_tipo_permisos_tipo_permisos1_idx` (`tipo_permisos_idtipo_permisos`),
  KEY `fk_usuario_has_tipo_permisos_usuario1_idx` (`usuario_idusuario`),
  CONSTRAINT `fk_usuario_has_tipo_permisos_tipo_permisos1` FOREIGN KEY (`tipo_permisos_idtipo_permisos`) REFERENCES `tipo_permisos` (`idtipo_permisos`),
  CONSTRAINT `fk_usuario_has_tipo_permisos_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.venta
CREATE TABLE IF NOT EXISTS `venta` (
  `idventa` int NOT NULL AUTO_INCREMENT,
  `cliente_idcliente` int NOT NULL,
  `sucursal_idsucursal` int NOT NULL,
  `vendedor_idvendedor` int NOT NULL,
  `caja_idcaja` int NOT NULL,
  `usuario_idusuario` int NOT NULL,
  `medico_idmedico` int DEFAULT NULL,
  `monto_total` varchar(45) DEFAULT NULL,
  `descuento` varchar(45) DEFAULT NULL,
  `monto_inicial` varchar(45) DEFAULT NULL,
  `debe` varchar(45) DEFAULT NULL,
  `haber` varchar(45) DEFAULT NULL,
  `saldo` varchar(45) DEFAULT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_alta` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idventa`),
  KEY `fk_venta_cliente_idx` (`cliente_idcliente`),
  KEY `fk_venta_sucursal1_idx` (`sucursal_idsucursal`),
  KEY `fk_venta_caja1_idx` (`caja_idcaja`),
  KEY `fk_venta_usuario1_idx` (`usuario_idusuario`),
  KEY `fk_venta_medico1_idx` (`medico_idmedico`),
  CONSTRAINT `fk_venta_caja1` FOREIGN KEY (`caja_idcaja`) REFERENCES `caja` (`idcaja`),
  CONSTRAINT `fk_venta_cliente` FOREIGN KEY (`cliente_idcliente`) REFERENCES `cliente` (`idcliente`),
  CONSTRAINT `fk_venta_medico1` FOREIGN KEY (`medico_idmedico`) REFERENCES `medico` (`idmedico`),
  CONSTRAINT `fk_venta_sucursal1` FOREIGN KEY (`sucursal_idsucursal`) REFERENCES `sucursal` (`idsucursal`),
  CONSTRAINT `fk_venta_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.venta_has_modo_pago
CREATE TABLE IF NOT EXISTS `venta_has_modo_pago` (
  `venta_idventa` int NOT NULL,
  `modo_pago_idmodo_pago` int NOT NULL,
  `banco_idbanco` int DEFAULT NULL,
  `mutual_idmutual` int DEFAULT NULL,
  `monto` varchar(45) DEFAULT NULL,
  `monto_int` varchar(45) DEFAULT NULL,
  `cant_cuotas` varchar(45) DEFAULT NULL,
  `monto_cuota` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`venta_idventa`,`modo_pago_idmodo_pago`),
  KEY `fk_venta_has_modo_pago_modo_pago1_idx` (`modo_pago_idmodo_pago`),
  KEY `fk_venta_has_modo_pago_venta1_idx` (`venta_idventa`),
  KEY `fk_venta_has_modo_pago_banco1_idx` (`banco_idbanco`),
  KEY `fk_venta_has_modo_pago_mutual1_idx` (`mutual_idmutual`),
  CONSTRAINT `fk_venta_has_modo_pago_banco1` FOREIGN KEY (`banco_idbanco`) REFERENCES `banco` (`idbanco`),
  CONSTRAINT `fk_venta_has_modo_pago_modo_pago1` FOREIGN KEY (`modo_pago_idmodo_pago`) REFERENCES `modo_pago` (`idmodo_pago`),
  CONSTRAINT `fk_venta_has_modo_pago_mutual1` FOREIGN KEY (`mutual_idmutual`) REFERENCES `mutual` (`idmutual`),
  CONSTRAINT `fk_venta_has_modo_pago_venta1` FOREIGN KEY (`venta_idventa`) REFERENCES `venta` (`idventa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla optdelsol_23.venta_has_stock
CREATE TABLE IF NOT EXISTS `venta_has_stock` (
  `venta_idventa` int NOT NULL,
  `stock_sucursal_idsucursal` int NOT NULL,
  `stock_codigo_idcodigo` int NOT NULL,
  `cantidad` int DEFAULT '0',
  PRIMARY KEY (`venta_idventa`,`stock_sucursal_idsucursal`,`stock_codigo_idcodigo`),
  KEY `fk_venta_has_stock_stock1_idx` (`stock_sucursal_idsucursal`,`stock_codigo_idcodigo`),
  KEY `fk_venta_has_stock_venta1_idx` (`venta_idventa`),
  CONSTRAINT `fk_venta_has_stock_stock1` FOREIGN KEY (`stock_sucursal_idsucursal`, `stock_codigo_idcodigo`) REFERENCES `stock` (`sucursal_idsucursal`, `codigo_idcodigo`),
  CONSTRAINT `fk_venta_has_stock_venta1` FOREIGN KEY (`venta_idventa`) REFERENCES `venta` (`idventa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
