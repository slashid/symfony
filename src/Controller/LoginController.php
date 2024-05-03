<?php

namespace SlashId\Symfony\Controller;

use SlashId\Php\SlashIdSdk;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Router;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;

class LoginController
{
    /**
     * @param mixed[]  $config
     * @param string[] $translationStrings
     */
    public function __construct(
        protected array $config,
        protected ?string $afterLoginRoute,
        protected array $translationStrings,
        protected Environment $twig,
        protected Router $router,
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
            'slot-success-indeterminate' => true,
            'analytics-enabled' => true,
            'factors' => [
                ['method' => 'webauthn'],
                ['method' => 'email_link'],
            ],
        ];

        // Adds translation strings.
        if ($this->translator) {
            $attributes['text'] = array_map(
                fn(string $string) => $this->translator->trans($string, domain: 'SlashIdSymfonyBundle'),
                array_combine($this->translationStrings, $this->translationStrings),
            );
        }

        // Adds CSS configuration.
        $cssOverrides = $this->config['css_override'];

        // Converts arrays and booleans to JSON.
        $attributes = array_map(fn($option) => is_array($option) || is_bool($option) ? json_encode($option) : $option, $attributes);

        // Renders the login form.
        return new Response($this->twig->render('@slashid/login/login.html.twig', [
            'attributes' => $attributes,
            'css_overrides' => $cssOverrides,
            'has_bundled' => !$this->config['override_bundled_javascript'],
            'has_glue' => !$this->config['override_javascript_glue'],
            'login_callback_url' => $this->router->generate('slashid.login.callback')
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
        return $this->afterLoginRoute ? $this->router->generate($this->afterLoginRoute) : '/';
    }
}
