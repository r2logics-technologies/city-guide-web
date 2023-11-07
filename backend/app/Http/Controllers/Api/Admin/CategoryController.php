<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CategoryResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Category;

class CategoryController extends Controller
{
    public function getData()
    {
        $categories = Category::allowed()->get();
        if ($categories && count($categories) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'categories' => CategoryResource::collection($categories),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No categories found.',
            'categories' => null,
        ]);
    }

    public function submitData(Request $request)
    {
        if (!$request->edited && $request->edited == null) {
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $request['slug'] = Str::slug($request->name);
            $data = $request->all();

            $find_category = Category::where('name', $request->name)->first();
            if ($find_category) {
                return response([
                    'status' => 'error',
                    'message' => 'This category already exists',
                ]);
            }

            if ($request->hasFile('icon_map_marker')) {
                $image = $request->icon_map_marker->store('images/categories/icon');
                $data['icon_map_marker'] = $image;
            }

            $create = Category::create($data);
            return response(
                [
                    'status' => 'success',
                    'category' => new CategoryResource($create),
                    'status_code' => 200,
                    'message' => 'Successfully added...'
                ],
                200
            );
        } else {
            $category = Category::find($request->edited);
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $request['slug'] = Str::slug($request->name);
            $data = $request->all();

            $find_category = Category::where('name', $request->name)->first();
            if ($find_category) {
                return response([
                    'status' => 'error',
                    'message' => 'This category already exists',
                ]);
            }

            if ($request->hasFile('icon_map_marker')) {
                $image = $request->icon_map_marker->store('images/categories/icon');
                $data['icon_map_marker'] = $image;
                if ($category->icon_map_marker) {
                    $category->deleteIcon();
                }
            } else {
                $data['icon_map_marker'] = $category->icon_map_marker;
            }

            $update = $category->update($data);
            if ($update) {
                $update = Category::find($request->edited);
                return response(
                    [
                        'status' => 'success',
                        'category' => new CategoryResource($update),
                        'status_code' => 200,
                        'message' => 'Successfully updated...'
                    ],
                    200
                );
            }
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something went wrong...',
            'category' => null,
        ], 500);
    }

    public function changeStatusData(Request $request, category $category)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Deactivated";
        }
        $updated =  $category->update(['status' => $request->status]);

        if ($updated) {
            $category =  Category::find($category->id);
            return response(['status' => 'success', 'message' => $message, 'category' => new CategoryResource($category)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,

        ]);
    }
}
