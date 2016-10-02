<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Customer\Customer;
use AppBundle\Form\CustomerType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * Customer controller.
 *
 * @Route("/api", service="app.customer_controller")
 */
class CustomerController extends Controller
{

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;


    /**
     * @var ValidatorInterface
     */
    protected $validator;

    /**
     * Create Customer Controller.
     */
    public function __construct(
        SerializerInterface $serializer,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator
    ) {
        parent::__construct($serializer);
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    /**
     * Lists all Customer entities.
     *
     * @Route(
     *    "/customer.{_format}",
     *    defaults={"_format": "json"},
     *    name="api_customer_index"
     * )
     * @Method("GET")
     */
    public function indexAction(Request $request) : Response
    {
        $order = [
          'lastName' => 'ASC',
          'firstName' => 'ASC',
        ];
        $customers = $this->entityManager->getRepository('AppBundle:Customer\Customer')->findBy([], $order);

        return $this->reply($customers, $request->getRequestFormat());
    }

    /**
     * Finds and displays a Customer entity.
     *
     * @Route(
     *    "/customer/{id}.{_format}",
     *    defaults={"_format": "json"},
     *    name="api_customer_show",
     *    requirements={"id": "\d+"}
     * )
     * @Method("GET")
     */
    public function showAction(Request $request, Customer $customer) : Response
    {
        return $this->reply($customer, $request->getRequestFormat());
    }

    /**
     * Creates a new Customer entity.
     *
     * @Route(
     *    "/customer.{_format}",
     *    defaults={"_format": "json"},
     *    name="api_customer_new"
     * )
     * @Method("POST")
     */
    public function newAction(Request $request) : Response
    {
        $customer = $this->serializer->deserialize(
            $request->getContent(),
            Customer::class,
            $request->getRequestFormat()
        );
        $errors = $this->validator->validate($customer);

        // Validation Errors.
        if (count($errors)) {
            return $this->reply($errors, $request->getRequestFormat(), 400);
        }

        $this->entityManager->persist($customer);
        $this->entityManager->flush();

        return $this->reply($customer, $request->getRequestFormat(), 201);
    }

    /**
     * Updates a Customer entity.
     *
     * @Route(
     *    "/customer/{id}.{_format}",
     *    defaults={"_format": "json"},
     *    name="api_customer_edit",
     *    requirements={"id": "\d+"}
     * )
     * @Method({"PUT", "PATCH"})
     */
    public function editAction(Customer $original, Request $request) : Response
    {
        // Get the emails now so they properly cascade.
        $original->getEmails()->initialize();

        $context = [];

        // If this is a PATCH request, use the existing object.
        if ($request->getMethod() === 'PATCH') {
            $context = [
                'object_to_populate' => $original,
            ];
        }

        $customer = $this->serializer->deserialize(
            $request->getContent(),
            Customer::class,
            $request->getRequestFormat(),
            $context
        );

        // Detach the customer before merging so the cascading works.
        // $this->entityManager->detach($customer);

        // Merge before validation to prevent unique constraints from firing.
        $customer = $this->entityManager->merge($customer);

        // Merge operation does not cascade to emails properly.
        foreach ($customer->getEmails() as $index => $email) {
            $customer->getEmails()->set($index, $this->entityManager->merge($email));
        }

        $errors = $this->validator->validate($customer);

        // Validation Errors.
        if (count($errors)) {
            return $this->reply($errors, $request->getRequestFormat(), 400);
        }

        $this->entityManager->flush();

        // Ensure what we are sending back to the client matches what is in the
        // database.
        $this->entityManager->refresh($customer);

        return $this->reply($customer, $request->getRequestFormat(), 200);
    }

    /**
     * Deletes a Customer entity.
     *
     * @Route(
     *    "/customer/{id}.{_format}",
     *    defaults={"_format": "json"},
     *    name="api_customer_delete",
     *    requirements={"id": "\d+"}
     * )
     * @Method("DELETE")
     */
    public function deleteAction(Customer $customer, Request $request) : Response
    {
        $this->entityManager->remove($customer);
        $this->entityManager->flush();

        return $this->reply('', $request->getRequestFormat(), 204);
    }

    /**
     * Retrieves a list of duplicate customers.
     *
     * @TODO Improve this algorithm. Right now we are determining duplicates
     *       by the last name matching, which will produce a lot of false
     *       positives in larger data sets. We should use additional fields
     *       and weights to determine if something is duplicate.
     *
     * @Route(
     *    "/customer/duplicates.{_format}",
     *    defaults={"_format": "json"},
     *    name="api_customer_duplicates"
     * )
     * @Method({"GET"})
     */
    public function duplicateAction(Request $request) : Response
    {
        $query = $this->entityManager->createQueryBuilder()
            ->select('c')
            ->from('AppBundle:Customer\Customer ', 'c')
            ->from('AppBundle:Customer\Customer ', 'c2')
            ->where('c.id != c2.id AND c.lastName = c2.lastName')
            ->orderBy('c.lastName', 'ASC')
            ->orderBy('c.firstName', 'ASC')
            ->getQuery();

        $customers = $query->getResult();

        return  $this->reply($customers, $request->getRequestFormat());
    }
}
