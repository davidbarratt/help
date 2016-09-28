<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Exception\ExceptionInterface;

/**
 * Abstract Controller.
 */
class ExceptionController extends Controller
{

    /**
     * @var KernelInterface
     */
    protected $kernel;

    /**
     * Create Customer Controller.
     */
    public function __construct(SerializerInterface $serializer, KernelInterface $kernel)
    {
        parent::__construct($serializer);
        $this->kernel = $kernel;
    }

    /**
     * Exception Handler.
     *
     * @param GetResponseForExceptionEvent $event
     *   The exception event.
     *
     * @return Response
     */
    public function onKernelException(GetResponseForExceptionEvent $event) : Response
    {
        $exception = $event->getException();
        $request = $event->getRequest();

        $status = 500;
        if ($exception instanceof HttpExceptionInterface) {
            $status = $exception->getStatusCode();
        }

        $message = [
          'error' => $exception->getMessage(),
        ];
        if ($exception instanceof \RuntimeException && $this->kernel->getEnvironment() == 'dev') {
            $message['trace'] = $exception->getTrace();
        }
        try {
            $response = $this->reply($message, $request->getRequestFormat('json'), $status);
        } catch (ExceptionInterface $e) {
            $response = $this->reply($message, 'json', $status);
        }

        $event->setResponse($response);
        return $response;
    }
}
