<?php
class Combinations
{

    public function __construct(){}

    public function getCombinations($maxPrice, $products) {
        $combinations = [];
        $this->combinacionesRecursivas($products, 0, [], 0, $combinations, $maxPrice);
        $unicCombinations = array_unique($combinations, SORT_REGULAR);
        return $unicCombinations;
    }

    public function  combinacionesRecursivas($products, $start, $actCombination, $actSumary, &$combinations, $maxPrice) {
        if (count($actCombination) >= 2 && $actSumary <= $maxPrice) {
            $combinations[] = array_merge($actCombination, [$actSumary]);
        }
        for ($i = $start; $i < count($products); $i++) {
            $newProduct = $products[$i];
            $actCombination[] = $newProduct['nombre'];
            $actSumary += $newProduct['precio'];
            $this->combinacionesRecursivas($products, $i + 1, $actCombination, $actSumary, $combinations, $maxPrice);
            array_pop($actCombination);
            $actSumary -= $newProduct['precio'];
        }
    }
}
