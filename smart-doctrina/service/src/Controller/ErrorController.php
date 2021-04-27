<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ErrorController
{
    public function show(Request $request, \Throwable $exception): Response
    {
        $msg = "";
        $msg .= "\n";
        $msg .= "\n";
        $msg .= $exception->getFile() . ':' . $exception->getLine() . "\n";
        $msg .= $exception->getMessage();
        $msg .= "\n";

        return new Response($msg);
    }

}
