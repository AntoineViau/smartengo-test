<?php

namespace App\Service;

use App\Entity\Article;
use App\Entity\Comment;
use Doctrine\ORM\EntityManagerInterface;

class CommentService
{
    protected $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function createComment(string $author, int $articleId, string $content): Comment
    {
        $articleRepository = $this->em->getRepository(Article::class);
        $article = $articleRepository->find($articleId);
        if (!$article) {
            throw new \Exception('article ' . $articleId . ' not found');
        }
        $comment = new Comment();
        $comment->setCreatedAt(date('U'));
        $comment->setAuthor($author);
        $comment->setContent($content);
        $comment->setArticle($article);
        $this->em->persist($comment);
        $this->em->flush();
        return $comment;
    }

    public function findByArticleId(int $articleId): array
    {
        $commentRepository = $this->em->getRepository(Comment::class);
        $comments = $commentRepository->findByArticleId($articleId);
        return $comments;
    }
}
