<?php

namespace Slashid\Symfony\Command\Webhook;

use SlashId\Php\SlashIdSdk;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class WebhookDeletionCommand extends Command
{
    public function __construct(
        protected SlashIdSdk $sdk,
    ) {
        parent::__construct();
    }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $id = $input->getArgument('id');
        $this->sdk->webhook()->deleteById($id);
        $output->writeln('Webhook with ID "'.$id.'" has been deleted.');

        return Command::SUCCESS;
    }

    protected function configure(): void
    {
        $this
            ->setDescription('Deletes a SlashID webhook')
            ->addArgument('id', mode: InputArgument::REQUIRED, description: 'The ID of the webhook, use slashid:webhook:list to get the ID')
        ;
    }
}
