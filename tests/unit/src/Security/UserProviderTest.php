<?php

namespace SlashId\Test\Symfony\Security;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use SlashId\Php\SlashIdSdk;
use SlashId\Symfony\Security\UserProvider;
use SlashId\Symfony\SlashIdUser;
use Symfony\Component\Security\Core\User\UserInterface;

#[CoversClass(UserProvider::class)]
class UserProviderTest extends TestCase
{
    protected SlashIdSdk&MockObject $sdk;
    protected UserProvider $userProvider;

    public function setUp(): void
    {
        $this->userProvider = new UserProvider(
            $this->sdk = $this->createMock(SlashIdSdk::class),
        );
    }

    public function testRefreshUser(): void
    {
        $user = new SlashIdUser();
        $this->assertEquals($user, $this->userProvider->refreshUser($user));
    }

    public function testSupportsClass(): void
    {
        $this->assertTrue($this->userProvider->supportsClass(SlashIdUser::class));
        $this->assertFalse($this->userProvider->supportsClass(UserInterface::class));
    }

    public function testLoadUserByIdentifier(): void
    {
        $this->sdk
            ->expects($this->once())
            ->method('get')
            ->with(
                $this->identicalTo('/persons/9999-9999-9999'),
                $this->identicalTo(['fields' => ['handles', 'groups', 'attributes']]),
            )
            ->willReturn([
                'active' => true,
                'person_id' => '9999-9999-9999',
                'roles' => [],
                'attributes' => [],
                'region' => 'us-iowa',
                'handles' => [
                    ['type' => 'email_address', 'value' => 'user@example.com'],
                ],
                'groups' => ['Editor'],
            ])
        ;
        $user = $this->userProvider->loadUserByIdentifier('9999-9999-9999');
        $this->assertEquals(['Editor'], $user->getGroups());
    }
}
