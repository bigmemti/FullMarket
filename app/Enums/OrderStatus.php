<?php

namespace App\Enums;

enum OrderStatus: int
{
    case CART = 0;
    case SUCCESS = 1;
    case FAILED = 2;
}