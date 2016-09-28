<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Abstract Controller.
 */
abstract class Controller
{

    /**
     * @var SerializerInterface
     */
    protected $serializer;

    /**
     * Create Customer Controller.
     */
    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * Reply with a response object.
     */
    public function reply($data, string $format, int $status = 200) : Response
    {
        return new Response($this->serializer->serialize($data, $format, [
          'groups' => [
            'api'
          ],
        ]), $status);
    }
}
