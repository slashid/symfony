<?php

namespace SlashId\Symfony\Security;

use SlashId\Php\SlashIdSdk;
use SlashId\Symfony\SlashIdUser;
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
        // We don't have a local database storage, so there is nothing to refresh.
        return $user;
    }

    public function supportsClass(string $class): bool
    {
        return $class === SlashIdUser::class;
    }

    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        /** @var array{active: bool, person_id: string, roles: string[], attributes: array<string, array<string, string|int|mixed[]|null>>, region: string, handles: array{type: string, value: string}[], groups: string[]} $values */
        $values = $this->sdk->get('/persons/' . $identifier, [
            'fields' => ['handles', 'groups', 'attributes'],
        ]);

        return SlashIdUser::fromValues($values);
    }
}
