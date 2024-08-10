## Pureba Desarrollador Fullstack

### Lenguajes

- PHP
- HTML
- JAVASCRITP
- CSS con boostrap
- JQUERY
- MYSQL Como base de Datos

[========]

### Configuracion del Backend
- En el archivo src/confi/database.php configurar las variables de entorno para la conecion a mysql

        $host = 'localhost';
        $db = 'crud_app';
        $user = 'root';
        $pass = '';

        try {
            $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error de conexión: " . $e->getMessage();
        }

- En el archivo index.php buscar el fragmento de codigo
```php
$patch_proyect = "/test_fullstack"; 
```
y remplazar el valor por el path relativo del proyecto en el servidor, es decir: en mi caso la url del proyecto es la siguiente <pre>http://localhost/test_fullstack/</pre> en este casi el valor del la variable es  "/test_fullstack"

[========]

### Configuracion del Frontend

- El frontend se encuentra en la carpeta **frontend**
- No necesita configuracion previa.
- Debe tener acceso a internet ya que se utilizan CDN de bootstrap y jquery, sin no tiene acceso el proyecto no funcionara

[========]

### Base de datos 

- En el repositorio se encuentran los scripts de la base de datos en un sql llamado "crud_app.sql"

[========]


Elaborado por ***Maycol David Sanchez Mora***

