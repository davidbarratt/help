<?php

namespace AppBundle\Controller;

use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Serializer\SerializerInterface;
use AppBundle\Entity\Customer\Customer;
use AppBundle\Form\CustomerType;

/**
 * Customer controller.
 *
 * @Route("/api/customer", service="app.customer_controller")
 */
class CustomerController extends Controller
{

    /**
     * @var RegistryInterface
     */
    protected $doctrine;

    /**
     * Create Customer Controller.
     */
    public function __construct(SerializerInterface $serializer, RegistryInterface $doctrine)
    {
        parent::__construct($serializer);
        $this->doctrine = $doctrine;
    }
    /**
     * Lists all Customer entities.
     *
     * @Route(
     *    "/{_format}",
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
     * Creates a new Customer entity.
     *
     * @Route(
     *    "/",
     *    defaults={"_format": "json"},
     *    name="api_customer_new"
     * )
     * @Method({"POST"})
     */
    public function newAction(Request $request)
    {
        $customer = new Customer();
        $form = $this->createForm('AppBundle\Form\CustomerType', $customer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($customer);
            $em->flush();

            return $this->redirectToRoute('api_customer_show', array('id' => $customer->getId()));
        }

        return $this->render('customer/new.html.twig', array(
            'customer' => $customer,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a Customer entity.
     *
     * @Route(
     *    "/{id}.{_format}",
     *    defaults={"_format": "json"},
     *    name="api_customer_show"
     * )
     * @Method("GET")
     */
    public function showAction(Customer $customer, Request $request) : Response
    {
        return $this->reply($customer, $request->getRequestFormat());
    }

    /**
     * Displays a form to edit an existing Customer entity.
     *
     * @Route(
     *    "/{id}.{_format}",
     *    defaults={"_format": "json"},
     *    name="api_customer_edit"
     * )
     * @Method({"PATCH"})
     */
    public function editAction(Request $request, Customer $customer)
    {
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
     *    "/{id}.{_format}",
     *    defaults={"_format": "json"},
     *    name="api_customer_delete"
     * )
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Customer $customer)
    {
        $form = $this->createDeleteForm($customer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($customer);
            $em->flush();
        }

        return $this->redirectToRoute('api_customer_index');
    }

    /**
     * Creates a form to delete a Customer entity.
     *
     * @param Customer $customer The Customer entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Customer $customer)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('api_customer_delete', array('id' => $customer->getId())))
            ->setMethod('DELETE')
            ->getForm();
    }
}
