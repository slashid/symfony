<?php

namespace Slashid\Symfony\Command\Webhook;

use SlashId\Php\SlashIdSdk;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\Input;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Routing\Router;

class WebhookRegistrationCommand extends Command
{
    protected function configure(): void
    {
        $this
            ->setDescription('Creates or updates a SlashID webhook')
            ->addArgument('name', mode: InputArgument::REQUIRED, description: 'The name of the webhook')
            ->addArgument('triggers', mode: InputArgument::OPTIONAL | InputArgument::IS_ARRAY, description: 'The name of the webhook')
            ->addOption('base-url', mode: InputOption::VALUE_REQUIRED, description: 'An optional URL for the base to which /slashid/webhook will be appended')
            ->addOption('webhook-url', mode: InputOption::VALUE_REQUIRED, description: 'An optional, arbitrary URL for the listener')
        ;
    }

    public function __construct(
        protected Router $router,
        protected SlashIdSdk $sdk,
    ) {
        parent::__construct();
    }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        /** @var string */
        $name = $input->getArgument('name');

        /** @var string[] */
        $triggers = $input->getArgument('triggers') ?: [
            'PersonDeleted_v1',
            'PersonLoggedOut_v1',
            'PasswordChanged_v1',
        ];

        // If the --webhook-url is informed, we use it.
        /** @var string|null */
        $webhookRoute = $input->getOption('webhook-url');

        // If not, we use the internal URL /slashid/webhook.
        if (!$webhookRoute) {
            /** @var string|null */
            $baseUrl = $input->getOption('base-url');

            // --base-url is used when Laravel i behind a proxy. We concatenate the internal URL with the base URL.
            if ($baseUrl) {
                $webhookRoute = $this->router->generate('slashid.webhook');
                $webhookRoute = $baseUrl.$webhookRoute;
            } else {
                $webhookRoute = $this->router->generate('slashid.webhook', referenceType: Router::ABSOLUTE_URL);
            }
        }

        $output->writeln('Creating webhook "'.$name.'" for URL '.$webhookRoute.' with triggers '.implode(', ', $triggers));

        $this->sdk->webhook()->register($webhookRoute, $name, $triggers);

        return Command::SUCCESS;
    }
}
