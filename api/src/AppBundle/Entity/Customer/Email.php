<?php

namespace AppBundle\Entity\Customer;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * Email
 *
 * @ORM\Table(name="customer_email")
 * @ORM\Entity()
 * @UniqueEntity("email")
 */
class Email
{

    /**
     * @var string
     *
     * @ORM\Id
     * @ORM\Column(name="email", type="string", length=63)
     * @Assert\Email()
     * @Groups({"api"})
     */
    private $email;

    /**
     * @var Customer
     *
     * @ORM\ManyToOne(targetEntity="Customer", inversedBy="emails")
     * @ORM\JoinColumn(name="customer_id", referencedColumnName="customer_id")
     */
    private $customer;

    /**
     * Get email
     *
     * @return string|null
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set email.
     *
     * @param string $email
     *
     * @return Email
     */
    public function setEmail(string $email) : self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get Customer.
     *
     * @return Customer
     */
    public function getCustomer() : Customer
    {
        return $this->customer;
    }

    /**
     * Set customer
     *
     * @param Customer $customer
     *
     * @return Customer
     */
    public function setCustomer(Customer $customer) : self
    {
        $this->customer = $customer;

        return $this;
    }
}
