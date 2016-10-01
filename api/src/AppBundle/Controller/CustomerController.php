<?php

namespace AppBundle\Controller;

use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use AppBundle\Entity\Customer\Customer;
use AppBundle\Form\CustomerType;

/**
 * Customer controller.
 *
 * @Route("/api", service="app.customer_controller")
 */
class CustomerController extends Controller
{

    /**
     * @var RegistryInterface
     */
    protected $doctrine;


    /**
     * @var ValidatorInterface
     */
    protected $validator;

    /**
     * Create Customer Controller.
     */
    public function __construct(
        SerializerInterface $serializer,
        RegistryInterface $doctrine,
        ValidatorInterface $validator
    ) {
        parent::__construct($serializer);
        $this->doctrine = $doctrine;
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
        $em = $this->doctrine->getManager();
        $order = [
          'lastName' => 'ASC',
          'firstName' => 'ASC',
        ];
        $customers = $em->getRepository('AppBundle:Customer\Customer')->findBy([], $order);

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

        $em = $this->doctrine->getManager();
        $em->persist($customer);
        $em->flush();

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

        $em = $this->doctrine->getManager();

        // Merge operation does not cascade if parent is already merged.
        // To force the merge to cascade, detach the parent.
        $em->detach($customer);

        // Merge before validation to prevent unique constraints from firing.
        $customer = $em->merge($customer);


        $errors = $this->validator->validate($customer);

        // Validation Errors.
        if (count($errors)) {
            return $this->reply($errors, $request->getRequestFormat(), 400);
        }

        if ($original->getId() !== $customer->getId()) {
            $message = [
              'error' => 'Resource ID does not match ID in body'
            ];
            return $this->reply($message, $request->getRequestFormat(), 400);
        }

        $em = $this->doctrine->getManager();
        $em->flush();

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
        $em = $this->doctrine->getManager();
        $em->remove($customer);
        $em->flush();

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
        $em = $this->doctrine->getManager();
        $query = $em->createQueryBuilder()
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
