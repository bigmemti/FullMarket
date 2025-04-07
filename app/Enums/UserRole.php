<?php

namespace App\Enums;

enum UserRole: int
{
    case Admin = 0;
    case User = 1;
}