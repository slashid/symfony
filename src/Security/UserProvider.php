<?php

namespace Slashid\Symfony\Security;

use SlashId\Php\SlashIdSdk;
use Slashid\Symfony\SlashIdUser;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

/**
 * @implements UserProviderInterface<SlashIdUser>
 */
class UserProvider implements UserProviderInterface
{
    public function __construct(
        protected SlashIdSdk $sdk,
    ) {}

    /**
     * @param SlashIdUser $user
     */
    public function refreshUser(UserInterface $user): UserInterface
    {
        return $user;
    }

    public function supportsClass(string $class): bool
    {
        return true;
    }

    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        return SlashIdUser::fromValues($this->sdk->get('/persons/' . $identifier, [
            'fields' => ['handles', 'groups', 'attributes'],
        ]));
    }
}
