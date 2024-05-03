<?php

namespace SlashId\Tests\Symfony\Command\Migration;

use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\MockObject\MockObject;
use SlashId\Php\Abstraction\MigrationAbstraction;
use SlashId\Symfony\Command\Migration\UserMigrationCommand;
use SlashId\Test\Symfony\Command\CommandTestCase;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Tester\CommandTester;
use Symfony\Component\Filesystem\Filesystem;

#[CoversClass(UserMigrationCommand::class)]
class UserMigrationCommandTest extends CommandTestCase
{
    protected UserMigrationCommand $command;
    protected EntityManagerInterface&MockObject $entityManager;
    protected Filesystem&MockObject $fileSystem;

    public function setUp(): void
    {
        parent::setUp();

        $this->entityManager = $this->createMock(EntityManagerInterface::class);
        $this->fileSystem = $this->createMock(Filesystem::class);

        $this->command = new UserMigrationCommand(
            __DIR__,
            $this->entityManager,
            $this->fileSystem,
            $this->sdk,
        );
    }

    public static function dataProviderTestExecute(): array
    {
        return [
            [false, false, false, false, false, false, Command::FAILURE],
            [true, false, false, false, false, false, Command::FAILURE],
            [true, true, false, false, false, false, Command::FAILURE],
            [true, true, true, false, false, false, Command::FAILURE],
            [true, true, true, true, false, false, Command::SUCCESS],
            [true, true, true, true, true, false, Command::SUCCESS],
            [true, true, true, true, true, true, Command::SUCCESS],
        ];
    }

    #[DataProvider('dataProviderTestExecute')]
    public function testExecute(bool $fileSystemExists, bool $returnsArray, bool $hasUsers, bool $hasValidUsers, bool $confirm, bool $hasFailure, int $expectedResponse): void
    {
        $this->fileSystem
            ->expects($this->once(__DIR__ . '/user-migration.php'))
            ->method('exists')
            ->willReturn($fileSystemExists);

        // Mock methods to transmit information to fake user-migration.php script.
        $this->entityManager
            ->expects($this->any())
            ->method('isOpen')
            ->willReturn($returnsArray);
        $this->entityManager
            ->expects($this->any())
            ->method('isFiltersStateClean')
            ->willReturn($hasUsers);
        $this->entityManager
            ->expects($this->any())
            ->method('hasFilters')
            ->willReturn($hasValidUsers);

        if ($confirm) {
            $migration = $this->createMock(MigrationAbstraction::class);
            $this->sdk
                ->expects($this->once())
                ->method('migration')
                ->willReturn($migration);
            $migration
                ->expects($this->once())
                ->method('migratePersons')
                ->willReturn([
                    'successful_imports' => 123,
                    'failed_imports' => $hasFailure,
                    'failed_csv' => 'aaa',
                ]);
        }

        $commandTester = new CommandTester($this->command);
        $commandTester->setInputs([$confirm ? 'y' : '']);
        $response = $commandTester->execute([]);

        $this->assertEquals($expectedResponse, $response);
    }
}
