<?php

namespace AppBundle\Tests\Normalizer;

use AppBundle\Entity\Customer\Customer;
use AppBundle\Entity\Customer\Email;
use AppBundle\Normalizer\CustomerNormalizer;
use AppBundle\Normalizer\SerializerInterface;

class CustomerNormalizerTest extends \PHPUnit_Framework_TestCase
{
    public function testDenormalize()
    {
          $data = [
            'id' => 1,
            'firstName' => 'John',
            'lastName' => 'Smith',
            'emails' => [
              [
                'email' => 'john.smith@example.com',
              ]
            ],
          ];

          $email = new Email();
          $email->setEmail($data['emails'][0]['email']);

          $normalizer = new CustomerNormalizer();
          $serializer = $this->createMock(SerializerInterface::class);

          $serializer->expects($this->once())
                     ->method('denormalize')
                     ->with($this->equalTo($data['emails'][0]), $this->equalTo(Email::class))
                     ->willReturn($email);
          $normalizer->setSerializer($serializer);

          $data = [
            'id' => 1,
            'firstName' => 'John',
            'lastName' => 'Smith',
            'emails' => [
              [
                'email' => 'john.smith@example.com',
              ]
            ],
          ];

          $customer = $normalizer->denormalize($data, Customer::class);

          $this->assertInstanceOf(Customer::class, $customer);
          $this->assertEquals($data['id'], $customer->getId());
          $this->assertEquals($data['firstName'], $customer->getFirstName());
          $this->assertEquals($data['lastName'], $customer->getLastName());
          $this->assertEquals($data['emails'][0]['email'], $customer->getEmails()->get(0)->getEmail());
    }
}
