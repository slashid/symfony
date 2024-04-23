<?php

namespace SlashId\Test\Symfony;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;
use SlashId\Symfony\SlashIdUser;

#[CoversClass(SlashIdUser::class)]
class SlashIdUserTest extends TestCase
{
    public function testGetRole(): void
    {
        $user = new SlashIdUser();
        $user->setGroups(['Editor', 'editor', 'admin']);

        $this->assertEquals(['ROLE_USER', 'ROLE_EDITOR', 'ROLE_ADMIN'], $user->getRoles());
    }

    public function testEraseCredentials(): void
    {
        $user = new SlashIdUser();
        $this->assertNull($user->eraseCredentials());
    }

    public function testGetUserIdentifier(): void
    {
        $user = new SlashIdUser('9999-9999-9999');
        $this->assertEquals('9999-9999-9999', $user->getUserIdentifier());
    }

    public function testGetUserIdentifierNull(): void
    {
        $this->expectException(\LogicException::class);
        $this->expectExceptionMessage('Calling getUserIdentifier() on a user without an identifier.');
        $user = new SlashIdUser();
        $user->getUserIdentifier();
    }
}
