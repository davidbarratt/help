<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\ConstraintViolationListInterface;

/**
 * Abstract Controller.
 */
abstract class Controller
{

    /**
     * @var array
     */
    const SERIALIZE_CONTEXT = [
      'groups' => [
        'api'
      ],
    ];

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
        if ($data instanceof ConstraintViolationListInterface) {
            $errors = $data;
            $data = [
                'error' => [],
            ];
            foreach ($errors as $error) {
                $data['error'][$error->getPropertyPath()][] = $error->getMessage();
            }
        }
        return new Response($this->serializer->serialize($data, $format, self::SERIALIZE_CONTEXT), $status);
    }
}
