<?php

namespace SlashId\Symfony\Controller;

use SlashId\Php\SlashIdSdk;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

class LoginController
{
    public function __construct(
        protected array $config,
        protected Environment $twig,
        protected Security $security,
        protected SlashIdSdk $sdk,
    ) {}

    public function login(): Response
    {
        if ($this->security->getUser()) {
            return new RedirectResponse($this->getPostLoginDestination());
        }

        $attributes = $this->config['configuration'] + [
            'oid' => $this->sdk->getOrganizationId(),
            'environment' => $this->sdk->getEnvironment(),
            'token-storage' => 'memory',
            'on-success' => 'slashIdLoginSuccessCallback',
            'slot-success-indeterminate' => 'true',
            'factors' => [
                ['method' => 'webauthn'],
                ['method' => 'email_link'],
            ],
        ];

        if ($this->config['analytics']) {
            $attributes['analytics-enabled'] = 'analytics-enabled';
        }

        // Converts arrays to JSON.
        $attributes = array_map(fn($option) => is_array($option) ? json_encode($option) : $option, $attributes);

        return new Response($this->twig->render('@slashid/login/login.html.twig', [
            'attributes' => $attributes,
        ]));
    }

    public function loginCallback(): Response
    {
        return new JsonResponse([
            'success' => true,
            'redirect' => $this->getPostLoginDestination(),
        ]);
    }

    protected function getPostLoginDestination(): string
    {
        return '/';
    }
}
