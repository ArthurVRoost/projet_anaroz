<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // 🔑 Ajout de tes middlewares personnalisés
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
            'exclude.roles' => \App\Http\Middleware\ExcludeRolesMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (Throwable $e, $request) {
            if ($request->inertia()) {
                $status = $e instanceof HttpExceptionInterface
                    ? $e->getStatusCode()
                    : 500;

                if (in_array($status, [403, 404, 500])) {
                    return Inertia::render("Errors/{$status}", [
                        'status' => $status,
                    ])->toResponse($request)->setStatusCode($status);
                }
            }
        });
    })
    ->create();