<?php

namespace SlashId\Test\Symfony\Controller;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use SlashId\Php\SlashIdSdk;
use SlashId\Symfony\Controller\LoginController;
use SlashId\Symfony\SlashIdUser;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Routing\Router;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;

#[CoversClass(LoginController::class)]
class LoginControllerTest extends TestCase
{
    protected Environment&MockObject $twig;
    protected Router&MockObject $router;
    protected Security&MockObject $security;
    protected SlashIdSdk&MockObject $sdk;
    protected TranslatorInterface&MockObject $translator;

    public function setUp(): void
    {
        $this->twig = $this->createMock(Environment::class);
        $this->router = $this->createMock(Router::class);
        $this->security = $this->createMock(Security::class);
        $this->sdk = $this->createMock(SlashIdSdk::class);
        $this->translator = $this->createMock(TranslatorInterface::class);
    }

    public static function dataProviderTestLogin(): array
    {
        $testCases = [
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 1, 0, 0],
            [0, 1, 0, 1],
            [0, 1, 1, 0],
            [0, 1, 1, 1],
            [1, 0, 0, 0],
            [1, 0, 0, 1],
            [1, 0, 1, 0],
            [1, 0, 1, 1],
            [1, 1, 0, 0],
            [1, 1, 0, 1],
            [1, 1, 1, 0],
            [1, 1, 1, 1],
        ];
        return array_map(
            fn($testCase) => array_map(fn($arg) => (bool) $arg, $testCase),
            $testCases,
        );
    }

    #[DataProvider('dataProviderTestLogin')]
    public function testLogin(bool $hasAnalytics, bool $overrideBundledJavascript, bool $overrideJavaScriptGlue, bool $hasTransator): void
    {
        $loginController = new LoginController(
            [
                'configuration' => [
                    'theme-props' => ['theme' => 'dark'],
                ],
                'analytics' => $hasAnalytics,
                'css_override' => [
                    '--sid-color-primary-hover' => '#900',
                ],
                'override_bundled_javascript' => $overrideBundledJavascript,
                'override_javascript_glue' => $overrideJavaScriptGlue,
            ],
            null,
            ['initial.title', 'success.title'],
            $this->twig,
            $this->router,
            $this->security,
            $this->sdk,
            $hasTransator ? $this->translator : null,
        );

        $attributes = [
            'attributes' => [
                'theme-props' => '{"theme":"dark"}',
                'oid' => '9999-9999-9999',
                'environment' => SlashIdSdk::ENVIRONMENT_PRODUCTION,
                'token-storage' => 'memory',
                'on-success' => 'slashIdLoginSuccessCallback',
                'slot-success-indeterminate' => 'true',
                'factors' => '[{"method":"webauthn"},{"method":"email_link"}]',
                'analytics-enabled' => null,
            ],
            'css_overrides' => [
                '--sid-color-primary-hover' => '#900',
            ],
            'has_bundled' => !$overrideBundledJavascript,
            'has_glue' => !$overrideJavaScriptGlue,
        ];

        if (!$hasAnalytics) {
            unset($attributes['attributes']['analytics-enabled']);
        }

        if ($hasTransator) {
            $attributes['attributes']['text'] = '{"initial.title":"","success.title":""}';
        }

        $this->sdk
            ->expects($this->once())
            ->method('getOrganizationId')
            ->willReturn('9999-9999-9999')
        ;

        $this->sdk
            ->expects($this->once())
            ->method('getEnvironment')
            ->willReturn(SlashIdSdk::ENVIRONMENT_PRODUCTION)
        ;

        $this->twig
            ->expects($this->once())
            ->method('render')
            ->with(
                $this->identicalTo('@slashid/login/login.html.twig'),
                $this->identicalTo($attributes),
            )
            ->willReturn('twig_output')
        ;

        $this->assertEquals('twig_output', $loginController->login()->getContent());
    }

    public function testLoginWhenAlreadyLoggedIn(): void
    {
        $loginController = new LoginController(
            [],
            null,
            [],
            $this->twig,
            $this->router,
            $this->security,
            $this->sdk,
            null,
        );

        $this->security
            ->expects($this->once())
            ->method('getUser')
            ->willReturn(new SlashIdUser())
        ;

        /** @var \Symfony\Component\HttpFoundation\RedirectResponse */
        $redirectResponse = $loginController->login();
        $this->assertEquals('/', $redirectResponse->getTargetUrl());
    }

    public function testLoginCallback(): void
    {
        $loginController = new LoginController(
            [],
            null,
            [],
            $this->twig,
            $this->router,
            $this->security,
            $this->sdk,
            null,
        );
        $this->assertEquals('{"success":true,"redirect":"\/"}', $loginController->loginCallback()->getContent());
    }
}
