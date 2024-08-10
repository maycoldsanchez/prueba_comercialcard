<?php
header("Content-Type: application/json; charset=UTF-8");

require_once 'src/config/database.php';
require_once 'src/controllers/ProductController.php';
require_once 'src/controllers/CombinationController.php';

$productController = new ProductController($pdo);
$combinationController = new CombinationController($pdo);

$patch_proyect = '/test_fullstack'; //Importante modificar segun la estructura de carpetas que contenga el proyecto

$real_uri = str_replace($patch_proyect, "", $_SERVER['REQUEST_URI']);
$method = $_SERVER['REQUEST_METHOD'];
$uri = explode('/', trim($real_uri, '/'));
if ($uri[0] === 'productos') {
    switch ($method) {
        case 'GET':
            $productController->read();
            break;
        case 'POST':
            $productController->create();
            break;
        case 'PUT':
            $id = intval($uri[1]);
            $productController->update($id);
            break;
        case 'DELETE':
            $id = intval($uri[1]);
            $productController->delete($id);
            break;
        default:
            echo json_encode(["message" => "Método no soportado"]);
            break;
    }
} else if ($uri[0] === 'combinations') {
    switch ($method) {
        case 'GET':
            $value = intval($uri[1]);
            $combinationController->getCombinations($value);
            break;
        default:
            echo json_encode(["message" => "Método no soportado"]);
            break;
    }
} else {
    echo json_encode(["message" => "Recurso no encontrado"]);
}
