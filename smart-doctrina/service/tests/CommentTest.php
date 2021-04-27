<?php

namespace App\Tests\Controller;

class CommentTest extends ApiControllerTest
{
    /**
     * @test
     */
    public function createCommentSuccess(): void
    {
        $this->request('POST', '/article', '{ "name": "test_name", "content": "test_content" }'
        );
        $articleIdDto = json_decode($this->client->getResponse()->getContent());
        $this->assertNotNull($articleIdDto);
        $this->assertEquals(1, $articleIdDto->id);

        $nbComments = 2;
        for ($i = 0; $i < $nbComments; $i++) {
            $this->request('POST', '/comment', '{ "author": "test_author' . $i . '", "content": "test_content' . $i . '", "articleId":' . $articleIdDto->id . ' }'
            );
            $commentId = json_decode($this->client->getResponse()->getContent());
            $this->assertNotNull($commentId);
        }

        $this->request('GET', '/article/1/comments');
        $comments = json_decode($this->client->getResponse()->getContent());
        $this->assertNotNull($comments);
        $this->assertEquals($nbComments, count($comments));
        for ($i = 0; $i < $nbComments; $i++) {
            $this->assertEquals(1, $comments[$i]->article->id);
            $this->assertEquals("test_author" . $i, $comments[$i]->author);
            $this->assertEquals("test_content" . $i, $comments[$i]->content);
        }
    }

}
