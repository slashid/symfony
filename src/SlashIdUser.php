<?php

namespace Slashid\Symfony;

use SlashId\Php\Person;
use Symfony\Component\Security\Core\User\UserInterface;

class SlashIdUser extends Person implements UserInterface
{
    public function getRoles(): array
    {
        return array_merge(['ROLE_USER'], $this->getGroups());
    }

    public function eraseCredentials(): void {}

    public function getUserIdentifier(): string
    {
        return $this->getPersonId();
    }
}
