<?php

namespace AppBundle\Normalizer;

use AppBundle\Entity\Customer\Customer;
use AppBundle\Entity\Customer\Email;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\SerializerAwareInterface;
use Symfony\Component\Serializer\SerializerAwareTrait;

/**
 * @author Jordi Boggiano <j.boggiano@seld.be>
 */
class CustomerNormalizer implements DenormalizerInterface, SerializerAwareInterface
{
    use SerializerAwareTrait;

    /**
     * {@inheritdoc}
     */
    public function denormalize($data, $class, $format = null, array $context = array())
    {
        $object = new $class();
        if (isset($data['firstName']) && is_string($data['firstName'])) {
            $object->setFirstName($data['firstName']);
        }
        if (isset($data['lastName']) && is_string($data['lastName'])) {
            $object->setLastName($data['lastName']);
        }
        $emails = $data['emails'] ?? [];
        foreach ($emails as $data) {
            $object->addEmail($this->serializer->denormalize($data, Email::class));
        }

        return $object;
    }

    /**
     * {@inheritdoc}
     */
    public function supportsDenormalization($data, $type, $format = null)
    {
        return $type === Customer::class;
    }
}
