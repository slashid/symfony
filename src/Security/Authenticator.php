<?php

namespace SlashId\Symfony\Security;

use SlashId\Php\SlashIdSdk;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class Authenticator extends AbstractAuthenticator
{
    public function __construct(
        protected SlashIdSdk $sdk,
    ) {}

    public function supports(Request $request): ?bool
    {
        return $request->headers->has('Authorization') && 0 === strpos((string) $request->headers->get('Authorization'), 'Bearer ');
    }

    public function authenticate(Request $request): Passport
    {
        // We know the header exists because it was checked on supports() */
        /** @var string */
        $token = $request->headers->get('Authorization');
        $token = substr($token, 7);

        if ($this->sdk->token()->validateToken($token)) {
            return new SelfValidatingPassport(new UserBadge($this->sdk->token()->getSubFromToken($token)));
        }

        throw new BadCredentialsException('The informed token is invalid.');
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new JsonResponse([
            'success' => false,
            'error' => $exception->getMessage(),
        ], 401);
    }
}
