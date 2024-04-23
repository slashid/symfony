<?php

namespace Slashid\Symfony\Command\Webhook;

use SlashId\Php\SlashIdSdk;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class WebhookListCommand extends Command
{
    public function __construct(
        protected SlashIdSdk $sdk,
    ) {
        parent::__construct();
    }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $rows = [];
        foreach ($this->sdk->webhook()->findAll() as $webhook) {
            $rows[] = [
                $webhook['id'],
                $webhook['name'],
                $webhook['target_url'],
                implode(',', $this->sdk->webhook()->getWebhookTriggers($webhook['id'])),
            ];
        }

        if (!empty($rows)) {
            $output->writeln('Webhooks for organization '.$this->sdk->getOrganizationId());
            (new Table($output))
                ->setHeaders(['ID', 'Name', 'URL', 'Triggers'])
                ->setRows($rows)
                ->render()
            ;

        } else {
            $output->writeln('No webhooks found for organization '.$this->sdk->getOrganizationId());
        }

        return Command::SUCCESS;
    }
}
