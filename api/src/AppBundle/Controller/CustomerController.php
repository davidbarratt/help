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
        // @TODO Abstract this?
        if (count($errors)) {
            $message['error'] = [];
            foreach ($errors as $error) {
                $message['error'][$error->getPropertyPath()][] = $error->getMessage();
            }
            return $this->reply($message, $request->getRequestFormat(), 400);
        }

        $em = $this->doctrine->getManager();
        $em->persist($customer);
        $em->flush();

        return $this->reply($customer, $request->getRequestFormat(), 201);
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
        $customers = $em->getRepository('AppBundle:Customer\Customer')->findAll();

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
     * Displays a form to edit an existing Customer entity.
     *
     * @Route(
     *    "/customer/{id}.{_format}",
     *    defaults={"_format": "json"},
     *    name="api_customer_edit",
     *    requirements={"id": "\d+"}
     * )
     * @Method("PATCH")
     */
    public function editAction(Customer $customer, Request $request) : Response
    {
        // @TODO Update this!
        $deleteForm = $this->createDeleteForm($customer);
        $editForm = $this->createForm('AppBundle\Form\CustomerType', $customer);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($customer);
            $em->flush();

            return $this->redirectToRoute('api_customer_edit', array('id' => $customer->getId()));
        }

        return $this->render('customer/edit.html.twig', array(
            'customer' => $customer,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
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
     * Displays a form to edit an existing Customer entity.
     *
     * @Route(
     *    "/customer/duplicates.{_format}",
     *    defaults={"_format": "json"},
     *    name="api_customer_duplicates"
     * )
     * @Method({"GET"})
     */
    private function duplicateAction(Request $request) : Response
    {
        return  $this->reply('', $request->getRequestFormat());
    }
}
