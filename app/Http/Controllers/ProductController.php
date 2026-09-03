<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with(['category', 'specs'])
            ->where('is_active', true)
            ->when($request->category_id, fn($q) =>
                $q->where('category_id', $request->category_id))
            ->when($request->search, fn($q) =>
                $q->where('name', 'like', '%'.$request->search.'%'))
            ->when($request->featured, fn($q) =>
                $q->where('is_featured', true))
            ->latest()
            ->paginate(12);

        return response()->json($products);
    }

    public function show(Product $product)
    {
        $product->load(['category', 'specs']);

        $related = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->limit(4)
            ->get();

        return response()->json([
            'product' => $product,
            'related' => $related,
        ]);
    }
}