<?php

namespace SlashId\Test\Symfony\Controller;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use SlashId\Php\SlashIdSdk;
use SlashId\Symfony\Controller\LoginController;
use SlashId\Symfony\SlashIdUser;
use Symfony\Bundle\SecurityBundle\Security;
use Twig\Environment;

#[CoversClass(LoginController::class)]
class LoginControllerTest extends TestCase
{
    protected Environment&MockObject $twig;
    protected Security&MockObject $security;
    protected SlashIdSdk&MockObject $sdk;
    protected LoginController $loginController;

    public function setUp(): void
    {
        $this->loginController = new LoginController(
            $this->twig = $this->createMock(Environment::class),
            $this->security = $this->createMock(Security::class),
            $this->sdk = $this->createMock(SlashIdSdk::class),
        );
    }

    public function testLogin(): void
    {
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
                $this->identicalTo([
                    'attributes' => [
                        'oid' => '9999-9999-9999',
                        'environment' => SlashIdSdk::ENVIRONMENT_PRODUCTION,
                        'token-storage' => 'memory',
                        'on-success' => 'slashIdLoginSuccessCallback',
                        'slot-success-indeterminate' => 'true',
                        'factors' => '[{"method":"webauthn"},{"method":"email_link"}]',
                    ],
                ]),
            )
            ->willReturn('twig_output')
        ;

        $this->assertEquals('twig_output', $this->loginController->login()->getContent());
    }

    public function testLoginWhenAlreadyLoggedIn(): void
    {
        $this->security
            ->expects($this->once())
            ->method('getUser')
            ->willReturn(new SlashIdUser())
        ;

        /** @var \Symfony\Component\HttpFoundation\RedirectResponse */
        $redirectResponse = $this->loginController->login();
        $this->assertEquals('/', $redirectResponse->getTargetUrl());
    }

    public function testLoginCallback(): void
    {
        $this->assertEquals('{"success":true,"redirect":"\/"}', $this->loginController->loginCallback()->getContent());
    }
}
