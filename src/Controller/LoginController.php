<?php

namespace Slashid\Symfony\Controller;

use SlashId\Php\SlashIdSdk;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Environment;

class LoginController
{
    public function __construct(
        protected Environment $twig,
        protected SlashIdSdk $sdk,
    )
    {}

    public function login(): Response
    {
        // @todo Add configuration
        $attributes = [
            'oid' => $this->sdk->getOrganizationId(),
            'environment' => $this->sdk->getEnvironment(),
            // @todo add texts with strings
            'token-storage' => 'memory',
            'on-success' => 'slashIdLoginSuccessCallback',
            'slot-success-indeterminate' => 'true',
            'factors' => [
                ['method' => 'webauthn'],
                ['method' => 'email_link'],
            ],
        ];

        $attributes = array_map(fn ($option) => is_array($option) ? json_encode($option) : $option, $attributes);

        return new Response($this->twig->render('@slashid/login/login.html.twig', [
            'attributes' => $attributes,
        ]));
    }
}
