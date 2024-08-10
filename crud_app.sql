
-- Base de datos: `crud_app`

CREATE DATABASE crud_app;

-- --------------------------------------------------------

-- Estructura de tabla para la tabla `productos`


CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Indices de la tabla `productos`
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);


-- AUTO_INCREMENT de las tablas volcadas

ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;