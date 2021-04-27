<?php

namespace App\Controller;

use Symfony\Component\Validator\Constraints as Assert;

class CommentDto
{
    /**
     * @Assert\NotBlank
     */
    public $author;

    /**
     * @Assert\NotBlank
     */
    public $content;

    /**
     * @Assert\NotBlank
     */
    public $articleId;
}
