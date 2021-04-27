<?php

namespace App\Controller;

use Symfony\Component\Validator\Constraints as Assert;

class ArticleDto
{
    /**
     * @Assert\NotBlank
     */
    public $name;

    /**
     * @Assert\NotBlank
     */
    public $content;

    /**
     * @Assert\NotBlank
     */
    public $draft;
}
