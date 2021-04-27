<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiControllerTest extends WebTestCase
{
    protected $client;

    // Generated with http://jwtbuilder.jamiekurtz.com/
    // Expiration date: 2162-04-23T17:46:50.631Z
    // login: ChuckNorrisn, role: ADMIN, userId: 1
    private $token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTkyMDAwMTAsImV4cCI6NjA2ODcxMzYxMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOiJBRE1JTiIsImxvZ2luIjoiQ2h1Y2tOb3JyaXMiLCJ1c2VySWQiOiIxIn0.rpEYGy1xXDFS6ScE5N5csD-scwlNr2D9nnAB3K8S_DA";

    /**
     * @beforeClass
     */
    public function setUp(): void
    {
        parent::setup();
        static::$kernel = static::createKernel();
        static::$kernel->boot();
        $this->em = static::$kernel->getContainer()->get('doctrine.orm.entity_manager');
        $tool = new \Doctrine\ORM\Tools\SchemaTool($this->em);
        $classes = $this->em->getMetaDataFactory()->getAllMetaData();
        $tool->dropSchema($classes);
        $tool->createSchema($classes);
        $this->client = static::createClient();
    }

    protected function request($method, $url, $body = "", $queryParams = [])
    {
        $headers = ['HTTP_Authorization' => 'Bearer ' . $this->token];
        return $this->client->request(
            $method,
            $url,
            $queryParams,
            [],
            $headers,
            $body
        );
    }

    /**
     * @test
     */
    public function dummyTest()
    {
        $this->assertTrue(true);
    }

}
