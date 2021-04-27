<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;

class EntityService
{
    protected $em;

    // // Called by service.yml
    // public function setEntityManager(EntityManager $em)
    // {
    //     $this->em = $em;
    // }

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

}
