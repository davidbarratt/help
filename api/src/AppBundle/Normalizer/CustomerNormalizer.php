<?php

namespace AppBundle\Normalizer;

use AppBundle\Entity\Customer\Customer;
use AppBundle\Entity\Customer\Email;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\SerializerAwareInterface;
use Symfony\Component\Serializer\SerializerAwareTrait;

class CustomerNormalizer implements DenormalizerInterface, SerializerAwareInterface
{
    use SerializerAwareTrait;

    /**
     * {@inheritdoc}
     */
    public function denormalize($data, $class, $format = null, array $context = array())
    {
        if (isset($context['object_to_populate'])) {
            $object = $context['object_to_populate'];
        } else {
            $object = new $class();
        }

        if (isset($data['id']) && is_int($data['id'])) {
            $object->setId($data['id']);
        }
        if (isset($data['firstName']) && is_string($data['firstName'])) {
            $object->setFirstName($data['firstName']);
        }
        if (isset($data['lastName']) && is_string($data['lastName'])) {
            $object->setLastName($data['lastName']);
        }

        if (isset($data['emails']) && is_array($data['emails'])) {
            $emails = [];
            foreach ($data['emails'] as $key => $email) {
                $emails[$key] = $email['email'];
            }
            foreach ($object->getEmails() as $email) {
                $key = array_search($email->getEmail(), $emails);
                if ($key !== false) {
                    unset($emails[$key]);
                    unset($data['emails'][$key]);
                } else {
                    $object->removeEmail($email);
                }
            }
            foreach ($data['emails'] as $item) {
                $object->addEmail($this->serializer->denormalize($item, Email::class));
            }
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
