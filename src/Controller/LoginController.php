<?php

namespace Slashid\Symfony\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Environment;

class LoginController
{
    public function __construct(
        protected Environment $twig,
    )
    {}

    public function login(): Response
    {
        return new Response($this->twig->render('@SlashIdSymfony/login/login.html.twig'));
    }
}
