<?php

namespace SlashId\Symfony\Command\Migration;

use SlashId\Php\SlashIdSdk;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Security\Core\User\UserInterface;

class MigrationScriptCreationCommand extends Command
{
    public function __construct(
        protected string $scriptDir,
        protected Filesystem $fileSystem,
    ) {
        parent::__construct();
    }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $filename = $this->scriptDir . '/user-migration.php';

        if ($this->fileSystem->exists($filename)) {
            if ($io->confirm("Script $filename already exists, do you want to overwrite it?", false)) {
                $io->success('Backup file copied to ' . $this->backupFile($filename));
            } else {
                $io->error('Will not overwrite script, aborting.');

                return Command::FAILURE;
            }
        }

        $class = $io->ask('Please inform the class of the user model', '\\App\\Entity\\User');
        if (!is_string($class) || empty($class)) {
            $io->error('Please input a class.');

            return Command::FAILURE;
        }
        if (! class_exists($class)) {
            $io->error("Class $class does not exist.");

            return Command::FAILURE;
        }
        if (! is_subclass_of($class, UserInterface::class)) {
            $io->error("Class $class is not an implementation of \\Symfony\Component\Security\Core\User\UserInterface.");

            return Command::FAILURE;
        }

        $this->fileSystem->mkdir(dirname($filename));
        $this->fileSystem->dumpFile($filename, $this->buildScript($class));

        $io->success("The Slash ID migration script has been created at $filename. Please open the file and modify it according to the instructions in it.");

        return Command::SUCCESS;
    }

    protected function configure(): void
    {
        $this
            ->setDescription('Creates a migration script to bulk import Doctrine users into SlashID')
        ;
    }

    protected function backupFile(string $filename): string
    {
        $count = 0;
        do {
            $backupFilename = $filename.'.bak'.($count ? '.'.$count : '');
            $count++;
        } while ($this->fileSystem->exists($backupFilename));

        $this->fileSystem->copy($filename, $backupFilename);

        return $backupFilename;
    }

    protected function buildScript(string $fullClassName): string
    {
        $fullClassName = ltrim($fullClassName, '\\');
        $classNameParts = explode('\\', $fullClassName);
        $className = array_pop($classNameParts);
        return <<<EOS
        <?php

        use $fullClassName;
        use Doctrine\ORM\EntityManagerInterface;
        use SlashId\Php\PersonInterface;
        use SlashId\Symfony\SlashIdUser;

        return static function(EntityManagerInterface \$entityManager): array {
            /** @var \$className[] */
            \$doctrineUsers = \$entityManager->getRepository($className::class)->findAll();
            \$slashIdUsers = [];

            foreach (\$doctrineUsers as \$doctrineUser) {
                \$roles = \$doctrineUser->getRoles();
                unset(\$roles[array_search('ROLE_USER', \$roles)]);

                // Converts "ROLE_ADMIN" into "Admin".
                \$roles = array_map(fn(string \$role) => ucwords(strtolower(str_replace('_', ' ', str_replace('ROLE_', '', \$role)))), \$roles);

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
        EOS;
    }
}
