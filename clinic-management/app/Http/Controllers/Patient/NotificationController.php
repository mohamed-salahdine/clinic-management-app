<?php

namespace App\Http\Controllers\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function markAsRead(Request $request, $id)
    {
        // Find the specific notification for the authenticated user
        $notification = $request->user()->notifications()->findOrFail($id);

        // Mark it as read so it disappears from the unread badge
        $notification->markAsRead();

        // Redirect to the URL provided inside the notification data, or back to the dashboard
        return redirect($notification->data['url'] ?? route('patient.dashboard'));
    }
}
