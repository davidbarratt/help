<?php

namespace AppBundle\Test\Controller;

use Doctrine\Common\Persistence\ObjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use AppBundle\Controller\CustomerController;
use AppBundle\Entity\Customer\Customer;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * Tests the Customer Controller. These tests are not completely useless, but
 * the controllers are somewhat trivial.
 *
 * @coversDefaultClass \AppBundle\Controller\CustomerController
 */
class CustomerControllerTest extends \PHPUnit_Framework_TestCase
{
    /**
     * Tests the index action.
     */
    public function testIndexAction()
    {
        $customer = new Customer();

        $serializer = $this->createMock(SerializerInterface::class);
        $serializer->expects($this->once())
                   ->method('serialize')
                   // The only assertion that we can perform is that the
                   // customer is sent to the serializer.
                   ->with($this->equalTo([$customer]));

        $entityManager = $this->createMock(EntityManagerInterface::class);

        $repository = $this->createMock(ObjectRepository::class);
        $repository->expects($this->once())
                   ->method('findBy')
                   ->willReturn([$customer]);

        $entityManager->expects($this->once())
                      ->method('getRepository')
                      ->with($this->equalTo('AppBundle:Customer\Customer'))
                      ->willReturn($repository);

        $validator = $this->createMock(ValidatorInterface::class);
        $controller = new CustomerController($serializer, $entityManager, $validator);

        $request = new Request();
        $controller->indexAction($request);
    }
}
