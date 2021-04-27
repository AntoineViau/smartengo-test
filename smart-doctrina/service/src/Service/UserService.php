<?php

namespace App\Service;

class UserService
{
    private $httpClient;
    private $jwtEncoder;

    public function __construct(HttpClientInterface $httpClient, JWTEncoderInterface $jwtEncoder)
    {
        $this->httpClient = $httpClient;
        $this->jwtEncoder = $jwtEncoder;
    }

    public function getUser(int $userId)
    {

    }

}
