<?php
namespace App\Controller;

use App\Service\CommentService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CommentController extends AbstractController
{
    private $commentService;
    private $serializer;

    public function __construct(
        CommentService $commentService,
        SerializerInterface $serializer) {
        $this->commentService = $commentService;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/comment", methods={"POST"})
     */
    public function createComment(Request $request): Response
    {
        try {
            $dto = $this->serializer->deserialize($request->getContent(), CommentDto::class, 'json');
            $comment = $this->commentService->createComment(
                $dto->author,
                $dto->articleId,
                $dto->content
            );

            $response = ["id" => $comment->getId()];
            $json = $this->serializer->serialize($response, 'json');
            return new Response($json);
        } catch (\Exception $e) {
            return new Response($e->getMessage());
        }
    }

    /**
     * @Route("/article/{articleId}/comments", methods={"GET"})
     */
    public function getArticleComments(Request $request, int $articleId): Response
    {
        try {
            $comments = $this->commentService->findByArticleId($articleId);
            $json = $this->serializer->serialize($comments, 'json');
            return new Response($json);
        } catch (\Exception $e) {
            return new Response($e->getMessage());
        }
    }
}
