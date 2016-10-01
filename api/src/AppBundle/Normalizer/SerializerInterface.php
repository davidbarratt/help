<?php

namespace AppBundle\Normalizer;

use Symfony\Component\Serializer\SerializerInterface as SymfonySerializerInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

interface SerializerInterface extends SymfonySerializerInterface, DenormalizerInterface
{

}
