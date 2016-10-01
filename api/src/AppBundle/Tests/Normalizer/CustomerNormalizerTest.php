<?php

namespace AppBundle\Tests\Normalizer;

use AppBundle\Entity\Customer\Customer;
use AppBundle\Entity\Customer\Email;
use AppBundle\Normalizer\CustomerNormalizer;
use AppBundle\Normalizer\SerializerInterface;

/**
 * Tests the Customer Normalizer.
 *
 * @coversDefaultClass \AppBundle\Normalizer\CustomerNormalizer
 */
class CustomerNormalizerTest extends \PHPUnit_Framework_TestCase
{

    /**
     * Tests normal use case of denormlaize().
     *
     * @covers ::denormalize
     */
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

    /**
     * Tests an empty array as data.
     */
    public function testDenormalizeEmpty()
    {
        $normalizer = new CustomerNormalizer();
        $serializer = $this->createMock(SerializerInterface::class);
        $serializer->expects($this->never())
                   ->method('denormalize');

        $normalizer->setSerializer($serializer);

        $customer = $normalizer->denormalize([], Customer::class);

        $this->assertInstanceOf(Customer::class, $customer);
        $this->assertNull($customer->getId());
        $this->assertNull($customer->getFirstName());
        $this->assertNull($customer->getLastName());
        $this->assertTrue($customer->getEmails()->isEmpty());
    }

    /**
     * Tests an filling an existing object.
     */
    public function testDenormalizeExisting()
    {
        $data = [
          'lastName' => 'Smith',
        ];
        $normalizer = new CustomerNormalizer();
        $serializer = $this->createMock(SerializerInterface::class);
        $serializer->expects($this->never())
                   ->method('denormalize');

        $normalizer->setSerializer($serializer);

        $original = new Customer();
        $original->setFirstName('John');

        $customer = $normalizer->denormalize($data, Customer::class, null, [
          'object_to_populate' => $original,
        ]);

        $this->assertInstanceOf(Customer::class, $customer);
        $this->assertNull($customer->getId());
        $this->assertEquals($original->getFirstName(), $customer->getFirstName());
        $this->assertEquals($data['lastName'], $customer->getLastName());
        $this->assertTrue($customer->getEmails()->isEmpty());
    }

    /**
     * Tests supportsDenormalization().
     *
     * @covers ::supportsDenormalization
     */
    public function testSupportsDenormalization()
    {
        $normalizer = new CustomerNormalizer();
        $this->assertTrue($normalizer->supportsDenormalization(null, Customer::class));
        $this->assertFalse($normalizer->supportsDenormalization(null, Email::class));
        $this->assertFalse($normalizer->supportsDenormalization(null, ''));
    }
}
