<?php

namespace App\Tests\Controller;

class ArticleTest extends ApiControllerTest
{
    /**
     * @test
     */
    public function createArticleSuccess(): void
    {
        $this->request('POST', '/article', '{ "name": "test_name", "content": "test_content" }'
        );
        $articleId = json_decode($this->client->getResponse()->getContent());

        $this->assertNotNull($articleId);
        $this->assertEquals(1, $articleId->id);

        $this->request('GET', '/article/1');
        $article = json_decode($this->client->getResponse()->getContent());
        $this->assertNotNull($article);
        $this->assertEquals(1, $article->id);
        $this->assertEquals("test_name", $article->name);
        $this->assertEquals("test_content", $article->content);
        $this->assertEquals(true, $article->draft);
        $this->assertEquals('', $article->reference);
    }
}
