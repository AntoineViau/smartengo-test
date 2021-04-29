<?php
namespace App\Controller;

use App\Entity\Article;
use App\Service\ArticleService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
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
            // TODO: validate deserialization
            $dto = $this->serializer->deserialize($request->getContent(), ArticleDto::class, 'json');
            // TODO: manage errors
            $article = $this->articleService->createArticle(
                $dto->name,
                $dto->content
            );
            $response = ["id" => $article->getId()];
            $json = $this->serializer->serialize($response, 'json');
            return new Response($json);
        } catch (\Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }
    }

    /**
     * @Route("/article/{id}", methods={"GET"}, requirements={ "id"="\d+" })
     */
    public function getArticle(int $id): Response
    {
        $article = $this->articleService->findById($id);
        if (!$article) {
            throw new NotFoundHttpException();
        }
        $json = $this->serializer->serialize($article, 'json');
        return new Response($json);
    }
}
