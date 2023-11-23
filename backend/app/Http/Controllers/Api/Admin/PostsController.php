<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PlaceResource;
use App\Http\Resources\Admin\PostResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Post;
use App\Models\PostCategory;

class PostsController extends Controller
{
    // category
    public function getCategories()
    {
        $categories = PostCategory::allowed()->get();
        if ($categories && count($categories) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'categories' => $categories,
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No categories found.',
            'categories' => null,
        ]);
    }

    public function submitCategory(Request $request)
    {
        if (!$request->edited && $request->edited == null) {
            $category = PostCategory::where('name', $request->name)->first();
            if (!$category) {
                $created = PostCategory::create([
                    'name' => Str::headline($request->name)
                ]);
                if ($created) return response(['status' => 'success', 'message' => "data successFully saved..", 'category' => $created], 200);

                return response(['status' => 'error', 'status_code' => 500, 'message' => 'something want wrong', 'category' => null,]);
            } else {
                return response(['status' => 'warning', 'status_code' => 505, 'message' => 'This category already exists', 'category' => null]);
            }
        } else {
            $category = PostCategory::find($request->edited);
            $find_category = PostCategory::where('name', $request->name)->where('id', '!=', $category->id)->first();
            if ($find_category) {
                return response([
                    'status' => 'error',
                    'message' => 'This category already exists',
                ]);
            }
            $updated = $category->update([
                'name' => $request->name,
            ]);
            if ($updated) {
                $category = PostCategory::find($request->edited);
                return response(['status' => 'success', 'message' => "data successFully updated..", 'category' => $category], 200);
            }

            return response(['status' => 'warning', 'status_code' => 500, 'message' => 'something want wrong unable to updated', 'category' => null,]);
        }
    }

    public function changeStatusCategory(Request $request, PostCategory $PostCategory)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Deactivated";
        }
        $updated =  $PostCategory->update(['status' => $request->status]);

        if ($updated) {
            $PostCategory =  PostCategory::find($PostCategory->id);
            return response(['status' => 'success', 'message' => $message, 'category' => $PostCategory], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,
        ]);
    }


    // Posts
    public function getPosts()
    {
        $posts = Post::allowed()->get();
        if ($posts && count($posts) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'posts' => PostResource::collection($posts),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No Posts found.',
            'posts' => null,
        ]);
    }
    public function getSpecificData($id)
    {
        $post = Post::find($id);
        if ($post) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'post' => new PostResource($post),
            ]);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No post found.',
            'post' => null,
        ]);
    }

    public function submitData(Request $request)
    {
        if (!$request->edited && $request->edited == null) {
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $request['slug'] = Str::slug($request->title);
            $data = $request->all();

            if ($request->hasFile('thumb')) {
                $data['thumb']  = '/storage/' . $request->thumb->store('images/post/thumb');
            }
            $create = Post::create($data);
            if ($create) {
                return response(
                    [
                        'status' => 'success',
                        'post' => new PostResource($create),
                        'status_code' => 200,
                        'message' => 'Successfully created...'
                    ],
                    200
                );
            }
        } else {
            $post = Post::find($request->edited);
            $auth = Auth::user()->id;
            $request['user_id'] = $auth;
            $request['slug'] = Str::slug($request->title);
            $data = $request->all();
            if ($request->hasFile('thumb')) {
                $data['thumb']  = '/storage/' . $request->thumb->store('images/post/thumb');

                if ($post->thumb) {
                    $post->deleteThumb();
                }
            } else {
                $data['thumb'] = $post->thumb;
            }

            $update = $post->update($data);
            if ($update) {
                $update = Post::find($request->edited);
                return response(
                    [
                        'status' => 'success',
                        'post' => new PostResource($update),
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
            'amenities' => null,
        ], 500);
    }

    public function changeStatusData(Request $request, Post $post)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Deactivated";
        }
        $updated =  $post->update(['status' => $request->status]);

        if ($updated) {
            $post =  Post::find($post->id);
            return response(['status' => 'success', 'message' => $message, 'post' => new PlaceResource($post)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,
        ]);
    }
}
