<?php
require_once  'src/config/database.php';
require_once  'src/models/Product.php';

class ProductController
{
    private $product;

    public function __construct($db)
    {
        $this->product = new Product($db);
    }

    public function create()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        if ($this->product->create($data)) {
            echo json_encode(["message" => "Producto creado"]);
        } else {
            echo json_encode(["message" => "Error al crear producto"]);
        }
    }

    public function read()
    {
        $products = $this->product->read();
        echo json_encode($products);
    }

    public function update($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);
        if ($this->product->update($id, $data)) {
            echo json_encode(["message" => "Producto actualizado"]);
        } else {
            echo json_encode(["message" => "Error al actualizar producto"]);
        }
    }

    public function delete($id)
    {
        if ($this->product->delete($id)) {
            echo json_encode(["message" => "Producto eliminado"]);
        } else {
            echo json_encode(["message" => "Error al eliminar producto"]);
        }
    }
}
