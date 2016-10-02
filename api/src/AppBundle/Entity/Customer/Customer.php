<?php

namespace AppBundle\Entity\Customer;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Customer
 *
 * @ORM\Table(name="customer")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\Customer\CustomerRepository")
 */
class Customer
{
    /**
     * @var int
     *
     * @ORM\Column(name="customer_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"api"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="first_name", type="string", length=127)
     * @Groups({"api"})
     * @Assert\NotBlank()
     */
    private $firstName;

    /**
     * @var string
     *
     * @ORM\Column(name="last_name", type="string", length=127)
     * @Groups({"api"})
     * @Assert\NotBlank()
     */
    private $lastName;

    /**
     * @ORM\OneToMany(
     *    targetEntity="Email",
     *    mappedBy="customer",
     *    cascade={"all"},
     *    orphanRemoval=true
     * )
     * @ORM\JoinColumn(name="customer_id", referencedColumnName="customer_id")
     * @Groups({"api"})
     * @Assert\Valid
     * @Assert\Count(
     *      min = "1"
     * )
     */
    private $emails;

    /**
     * Create Customer Entity.
     */
    public function __construct()
    {
        $this->emails = new ArrayCollection();
    }

    /**
     * Set id
     *
     * @param int $id
     *
     * @return Customer
     */
    public function setId(int $id) : self
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get id
     *
     * @return int|null
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set firstName
     *
     * @param string $firstName
     *
     * @return Customer
     */
    public function setFirstName(string $firstName) : self
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string|null
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     *
     * @return Customer
     */
    public function setLastName(string $lastName) : self
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string|null
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Add email
     *
     * @param Email $email
     *
     * @return Customer
     */
    public function addEmail(Email $email) : self
    {
        $email->setCustomer($this);
        $this->emails[] = $email;

        return $this;
    }

    /**
     * Remove email
     *
     * @param Email $email
     */
    public function removeEmail(Email $email) : self
    {
        $this->emails->removeElement($email);

        return $this;
    }

    /**
     * Get emails
     *
     * @return Doctrine\Common\Collections\Collection
     */
    public function getEmails() : Collection
    {
        return $this->emails;
    }
}
