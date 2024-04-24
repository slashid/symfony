<?php

namespace SlashId\Test\Symfony\Security;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use SlashId\Php\Abstraction\TokenAbstraction;
use SlashId\Php\SlashIdSdk;
use SlashId\Symfony\Security\Authenticator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

#[CoversClass(Authenticator::class)]
class AuthenticatorTest extends TestCase
{
    protected TokenAbstraction&MockObject $token;
    protected SlashIdSdk&MockObject $sdk;
    protected Authenticator $authenticator;

    public function setUp(): void
    {
        $this->token = $this->createMock(TokenAbstraction::class);
        $this->authenticator = new Authenticator(
            $this->sdk = $this->createMock(SlashIdSdk::class),
        );
        $this->sdk
            ->expects($this->any())
            ->method('token')
            ->willReturn($this->token)
        ;
    }

    public static function dataProviderTestSupports(): array
    {
        return [
            [[], false],
            [['HTTP_AUTHORIZATION' => 'Missing Bearer'], false],
            [['HTTP_AUTHORIZATION' => 'Bearer TOKEN'], true],
        ];
    }

    #[DataProvider('dataProviderTestSupports')]
    public function testSupports(array $server, bool $supports): void
    {
        $request = new Request(server: $server);
        $this->assertEquals($supports, $this->authenticator->supports($request));
    }

    public function testAuthenticate(): void
    {
        $request = new Request(server: ['HTTP_AUTHORIZATION' => 'Bearer TOKEN']);
        $this->token
            ->expects($this->once())
            ->method('validateToken')
            ->with($this->identicalTo('TOKEN'))
            ->willReturn(true)
        ;
        $this->token
            ->expects($this->once())
            ->method('getSubFromToken')
            ->with($this->identicalTo('TOKEN'))
            ->willReturn('9999-9999-9999')
        ;
        $passport = $this->authenticator->authenticate($request);
        $this->assertInstanceOf(SelfValidatingPassport::class, $passport);
        /** @var \Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge */
        $badge = $passport->getBadges()[UserBadge::class];
        $this->assertEquals('9999-9999-9999', $badge->getUserIdentifier());
    }

    public function testAuthenticateException(): void
    {
        $request = new Request(server: ['HTTP_AUTHORIZATION' => 'Bearer TOKEN']);
        $this->token
            ->expects($this->once())
            ->method('validateToken')
            ->with($this->identicalTo('TOKEN'))
            ->willReturn(false)
        ;
        $this->expectException(BadCredentialsException::class);
        $this->expectExceptionMessage('The informed token is invalid.');
        $passport = $this->authenticator->authenticate($request);
    }

    public function testOnAuthenticationSuccess(): void
    {
        $this->assertNull(
            $this->authenticator->onAuthenticationSuccess(
                new Request(),
                $this->createMock(TokenInterface::class),
                'main',
            ),
        );
    }

    public function testOnAuthenticationFailure(): void
    {
        $response = $this->authenticator->onAuthenticationFailure(new Request(), new AuthenticationException('Message'));
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals('{"success":false,"error":"Message"}', $response->getContent());
    }
}
