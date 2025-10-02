<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
        public function handle($request, Closure $next, ...$roles){
            $user = Auth::user();
            if (!$user) {
                abort(403, 'Accès refusé');
            }

            // Admin → accès total
            if ($user->role && $user->role->nom === 'Admin') {
                return $next($request);
            }

            // Sinon, vérifie le rôle
            if (in_array($user->role->nom, $roles)) {
                return $next($request);
            }

            abort(403, 'Accès refusé');
    }
}
