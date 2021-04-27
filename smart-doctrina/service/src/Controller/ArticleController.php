<?php
namespace App\Controller;

use App\Entity\Article;
use App\Service\ArticleService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ArticleController extends AbstractController
{
    private $articleService;
    private $serializer;

    public function __construct(
        ArticleService $articleService,
        SerializerInterface $serializer) {
        $this->articleService = $articleService;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/article", methods={"POST"})
     */
    public function createArticle(Request $request): Response
    {
        try {
            $dto = $this->serializer->deserialize($request->getContent(), ArticleDto::class, 'json');
            $article = $this->articleService->createArticle(
                $dto->name,
                $dto->content
            );

            $response = ["id" => $article->getId()];
            $json = $this->serializer->serialize($response, 'json');
            return new Response($json);
        } catch (\Exception $e) {
            return new Response($e->getMessage());
        }
    }

    /**
     * @Route("/article/{id}", methods={"GET"})
     */
    public function getArticle(Request $request, int $id): Response
    {
        try {
            $article = $this->articleService->findById($id);
            $json = $this->serializer->serialize($article, 'json');
            return new Response($json);
        } catch (\Exception $e) {
            return new Response($e->getMessage());
        }
    }
}
