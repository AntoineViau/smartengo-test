<?php

namespace App\Service;

use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;

class ArticleService
{
    protected $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function createArticle(string $name, string $content): Article
    {
        $article = new Article();
        $article->setCreatedAt(date('U'));
        $article->setName($name);
        $article->setReference('');
        $article->setContent($content);
        $article->setDraft(true);
        $this->em->persist($article);
        $this->em->flush();
        return $article;
    }

    public function findById(int $id): ?Article
    {
        $articleRepository = $this->em->getRepository(Article::class);
        $article = $articleRepository->find($id);
        return $article;
    }
}
