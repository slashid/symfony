<?php

namespace SlashId\Symfony\Command\Migration;

use Doctrine\ORM\EntityManagerInterface;
use SlashId\Php\PersonInterface;
use SlashId\Php\SlashIdSdk;
use SlashId\Symfony\SlashIdUser;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Filesystem\Filesystem;

class UserMigrationCommand extends Command
{
    public function __construct(
        protected string $scriptDir,
        protected EntityManagerInterface $entityManager,
        protected Filesystem $fileSystem,
        protected SlashIdSdk $sdk,
    ) {
        parent::__construct();
    }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $filename = $this->scriptDir . '/user-migration.php';

        if (!$this->fileSystem->exists($filename)) {
            $io->error('The script database/slashid-user-migration.php does not exist. Please create one using "php artisan slashid:import:create-script".');

            return Command::FAILURE;
        }

        $closure = require_once $filename;
        $users = $closure($this->entityManager);

        if (!is_array($users)) {
            $io->error("The script at $filename must return an array of \\SlashId\\Laravel\\SlashIdUser.");

            return Command::FAILURE;
        }

        if (empty($users)) {
            $io->error("The script at $filename returned an empty array.");
        }

        foreach ($users as $user) {
            if (!($user instanceof SlashIdUser)) {
                $io->error("The script at $filename must return an array of \\SlashId\\Laravel\\SlashIdUser.");

                return Command::FAILURE;
            }
        }

        // Renders table to confirm importing.
        $io->table([
            'Emails',
            'Phone numbers',
            'Region',
            'Roles',
            'Groups',
            'Attributes',
        ], array_map(fn(PersonInterface $person) => [
            implode(',', $person->getEmailAddresses()),
            implode(',', $person->getPhoneNumbers()),
            $person->getRegion() ?? '',
            '',
            implode(',', $person->getGroups()),
            \json_encode($person->getAllAttributes()),
        ], array_slice($users, 0, 5)));

        if ($io->confirm('Do you want to proceed with importing ' . count($users) . ' users?', false)) {
            $response = $this->sdk->migration()->migratePersons($users);
            $io->success($response['successful_imports'] . ' successfully imported users.');

            // Displays errors if any.
            if ($response['failed_imports'] && $response['failed_csv']) {
                $logFilePath = $this->scriptDir . '/migration-failed-' . date('Ymdhi') . '.csv';
                $this->fileSystem->dumpFile($logFilePath, $response['failed_csv']);
                $io->warning($response['failed_imports'] . " users failed importing. Check the file $logFilePath for errors.");
            }
        } else {
            $io->warning('Aborted migration.');
        }

        return Command::SUCCESS;
    }

    protected function configure(): void
    {
        $this
            ->setDescription('Bulk import users from Doctrine into SlashID.')
        ;
    }
}
