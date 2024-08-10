<?php
require_once  'src/config/database.php';
require_once  'src/models/Combinations.php';
require_once  'src/models/Product.php';

class CombinationController
{
    private $combinations, $product;

    public function __construct($db)
    {
        $this->combinations = new Combinations();
        $this->product = new Product($db);
    }

    public function getCombinations($value)
    {
        $products = $this->product->read();
        $productsCombinations = $this->combinations->getCombinations($value, $products);
        echo json_encode($productsCombinations);
    }
}
