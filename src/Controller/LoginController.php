<?php

namespace SlashId\Symfony\Controller;

use SlashId\Php\SlashIdSdk;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;

class LoginController
{
    public function __construct(
        protected array $config,
        protected array $translationStrings,
        protected Environment $twig,
        protected Security $security,
        protected SlashIdSdk $sdk,
        protected ?TranslatorInterface $translator,
    ) {}

    public function login(): Response
    {
        if ($this->security->getUser()) {
            return new RedirectResponse($this->getPostLoginDestination());
        }

        // Adds configuration and the default configuration.
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

        // Adds analytics, if enabled.
        if ($this->config['analytics']) {
            $attributes['analytics-enabled'] = NULL;
        }

        // Adds translation strings.
        if ($this->translator) {
            $attributes['text'] = array_map(
                fn(string $string) => $this->translator->trans($string, domain: 'SlashIdSymfonyBundle'),
                array_combine($this->translationStrings, $this->translationStrings),
            );
        }

        // Adds CSS configuration.
        $cssOverrides = $this->config['css_override'];

        // Converts arrays to JSON.
        $attributes = array_map(fn($option) => is_array($option) ? json_encode($option) : $option, $attributes);

        // Renders the login form.
        return new Response($this->twig->render('@slashid/login/login.html.twig', [
            'attributes' => $attributes,
            'css_overrides' => $cssOverrides,
            'has_bundled' => !$this->config['override_bundled_javascript'],
            'has_glue' => !$this->config['override_javascript_glue'],
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
