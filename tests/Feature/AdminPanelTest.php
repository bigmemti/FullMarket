<?php

use App\Models\User;
use App\Enums\UserRole;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('admin can access admin panel', function () {
    $response = $this->actingAs(User::factory()->create(['role' => UserRole::Admin]))->get(route('admin.panel'));
    
    $response->assertStatus(200);
});

test('user cannot access admin panel', function () {
    $response = $this->actingAs(User::factory()->create())->get(route('admin.panel'));

    $response->assertStatus(403);
});
