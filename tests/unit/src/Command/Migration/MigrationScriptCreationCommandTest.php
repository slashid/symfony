<?php

namespace SlashId\Symfony\Command\Migration;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\MockObject\MockObject;
use SlashId\Symfony\SlashIdUser;
use SlashId\Test\Symfony\Command\CommandTestCase;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Tester\CommandTester;
use Symfony\Component\Filesystem\Filesystem;

class MigrationScriptCreationCommandTest extends CommandTestCase
{
    protected MigrationScriptCreationCommand $command;
    protected Filesystem&MockObject $fileSystem;

    public function setUp(): void
    {
        parent::setUp();

        $this->fileSystem = $this->createMock(Filesystem::class);

        $this->command = new MigrationScriptCreationCommand(
            __DIR__,
            $this->fileSystem,
        );
    }

    public static function dataProviderTestExecute(): array
    {
        return [
            [[true], ['n'], Command::FAILURE],
            [[true, true, false], ['y', 'not_a_class'], Command::FAILURE],
            [[false], [self::class], Command::FAILURE],
            [[false], [SlashIdUser::class], Command::SUCCESS],
        ];
    }

    #[DataProvider('dataProviderTestExecute')]
    public function testExecute(array $fileSystemExists, array $inputs, int $expectedResponse): void
    {
        $this->fileSystem
            ->expects($this->exactly(count($fileSystemExists)))
            ->method('exists')
            ->willReturnCallback(function () use (&$fileSystemExists) {
                return array_shift($fileSystemExists);
            })
        ;

        if (Command::SUCCESS === $expectedResponse) {
            $this->fileSystem
                ->expects($this->once())
                ->method('dumpFile')
                ->with(
                    $this->identicalTo(__DIR__ . '/user-migration.php'),
                    $this->identicalTo(<<<EOS
                    <?php

                    use SlashId\Symfony\SlashIdUser;
                    use Doctrine\ORM\EntityManagerInterface;
                    use SlashId\Php\PersonInterface;
                    use SlashId\Symfony\SlashIdUser;

                    return static function (EntityManagerInterface \$entityManager): array {
                        /** @var array<SlashIdUser> */
                        \$doctrineUsers = \$entityManager->getRepository(SlashIdUser::class)->findAll();
                        \$slashIdUsers = [];

                        foreach (\$doctrineUsers as \$doctrineUser) {
                            \$roles = \$doctrineUser->getRoles();
                            unset(\$roles[array_search('ROLE_USER', \$roles)]);

                            // Converts "ROLE_ADMIN" into "Admin".
                            \$roles = array_map(fn (string \$role) => ucwords(strtolower(str_replace('_', ' ', str_replace('ROLE_', '', \$role)))), \$roles);

                            \$slashIdUser = new SlashIdUser();
                            \$slashIdUser
                                ->addEmailAddress(\$doctrineUser->getEmail())
                                ->setLegacyPasswordToMigrate(\$doctrineUser->getPassword())
                                // Uncomment if you want to set the phone number.
                                // ->addPhoneNumber(\$doctrineUser->getPhoneNumber())
                                ->setGroups(\$roles)
                                // Uncomment if you want to specify a region for the user.
                                // ->setRegion('us-iowa')
                                ->setBucketAttributes(PersonInterface::BUCKET_ORGANIZATION_END_USER_NO_ACCESS, [
                                    // List the user attributes you want to migrate, grouped by bucket.
                                    'old_id' => \$doctrineUser->getUserIdentifier(),
                                    // 'first_name' => \$doctrineUser->getFirstName(),
                                    // 'last_name' => \$doctrineUser->getLastName(),
                                ])
                            ;

                            \$slashIdUsers[] = \$slashIdUser;
                        }

                        return \$slashIdUsers;
                    };

                    EOS),
                )
            ;
        }

        $commandTester = new CommandTester($this->command);
        $commandTester->setInputs($inputs);
        $response = $commandTester->execute([]);

        $this->assertEquals($expectedResponse, $response);
    }
}
