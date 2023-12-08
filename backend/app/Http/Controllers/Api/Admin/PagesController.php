<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PageResource;
use App\Http\Resources\Admin\ContactResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Contact;

class PagesController extends Controller
{
    public function getData()
    {
        $pages = Page::allowed()->get();
        if ($pages && count($pages) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'pages' => PageResource::collection($pages),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No pages found.',
            'pages' => null,
        ]);
    }

    public function submitData(Request $request)
    {
        if (!$request->edited && $request->edited == null) {
            $data = $request->all();

            $find_amenities = Page::where('title', $request->title)->first();
            if ($find_amenities) {
                return response([
                    'status' => 'error',
                    'message' => 'This page already exists',
                ]);
            }

            if ($request->hasFile('thumb') && $request->thumb != null && $request->thumb != "") {
                $data['thumb'] = '/storage/' . $request->thumb->store('images/pages');
            }

            $create = Page::create($data);
            return response(
                [
                    'status' => 'success',
                    'page' => new PageResource($create),
                    'status_code' => 200,
                    'message' => 'Successfully added...'
                ],
                200
            );
        } else {
            $page = Page::find($request->edited);
            $data = $request->all();

            $find_amenities = Page::where('title', $request->title)->where('id', '!=', $page->id)->first();
            if ($find_amenities) {
                return response([
                    'status' => 'error',
                    'message' => 'This page already exists',
                ]);
            }

            if ($request->hasFile('thumb') && $request->thumb != null && $request->thumb != "") {
                $data['thumb'] = '/storage/' . $request->thumb->store('images/page');
                if ($page->thumb) {
                    $page->deleteIcon();
                }
            } else {
                $data['thumb'] = $page->thumb;
            }

            $update = $page->update($data);
            if ($update) {
                $update = Page::find($request->edited);
                return response(
                    [
                        'status' => 'success',
                        'page' => new PageResource($update),
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
        ], 500);
    }

    public function changeStatusData(Request $request, Page $page)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Deactivated";
        }
        $updated =  $page->update(['status' => $request->status]);

        if ($updated) {
            $page =  Page::find($page->id);
            return response(['status' => 'success', 'message' => $message, 'page' => new PageResource($page)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,
        ]);
    }

    public function getContact(Request $req){
        $contacts = Contact::allowed()->get();
        if ($contacts && count($contacts) > 0) {
            return response([
                'status' => 'success',
                'message' => '',
                'status_code' => 200,
                'contacts' => ContactResource::collection($contacts),
            ]);
        }
        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'No contacts found.',
            'contacts' => null,
        ]);
    }

    public function changeContactStatus(Request $request, Contact $contact)
    {
        $message = "";
        if ($request->status == 'deleted') {
            $message = "Deleted";
        } else if ($request->status == 'activated') {
            $message = "Activated";
        } else {
            $message = "Mark as Read";
        }
        $updated =  $contact->update(['status' => $request->status]);

        if ($updated) {
            $contact =  Contact::find($contact->id);
            return response(['status' => 'success', 'message' => $message, 'contact' => new ContactResource($contact)], 200);
        }

        return response([
            'status' => 'warning',
            'status_code' => 500,
            'message' => 'something want wrong. unable to ' . $message,
        ]);
    }
}
