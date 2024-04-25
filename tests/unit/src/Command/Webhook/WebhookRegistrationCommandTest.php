<?php

namespace SlashId\Test\Symfony\Command\Webhook;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use SlashId\Symfony\Command\Webhook\WebhookRegistrationCommand;
use SlashId\Test\Symfony\Command\CommandTestCase;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Routing\Router;

#[CoversClass(WebhookRegistrationCommand::class)]
class WebhookRegistrationCommandTest extends CommandTestCase
{
    public static function dataProviderTestHandle(): array
    {
        $localWebhookUrl = 'https://localhost/webhook';
        $webhookUrl = 'https://example.com/webhook';
        $baseUrl = 'https://example.com';

        return [
            [null,        null,     $localWebhookUrl],
            [null,        $baseUrl, $webhookUrl],
            [$webhookUrl, null,     $webhookUrl],
            [$webhookUrl, $baseUrl, $webhookUrl],
        ];
    }

    #[DataProvider('dataProviderTestHandle')]
    public function testHandle(?string $optionWebhookUrl, ?string $optionBaseUrl, ?string $expectedWebhookUrl): void
    {
        $this->input
            ->expects($this->exactly(2))
            ->method('getArgument')
            ->withAnyParameters()
            ->willReturnCallback(fn ($argument) => $argument === 'name' ? 'webhook_name' : ['PersonDeleted_v1'])
        ;
        $this->input
            ->expects($this->any())
            ->method('getOption')
            ->withAnyParameters()
            ->willReturnCallback(fn ($option) => $option === 'webhook-url' ? $optionWebhookUrl : $optionBaseUrl)
        ;
        $this->output
            ->expects($this->once())
            ->method('writeln')
            ->with(
                $this->identicalTo(
                    $expectedWebhookUrl ?
                        'Creating webhook "webhook_name" for URL '.$expectedWebhookUrl.' with triggers PersonDeleted_v1' :
                        'Webhooks are not enable for this installation. Either add "webhook_enable" => true to config/slashid.php or define a full URL with --webhook-url.'
                ),
            )
        ;
        $this->webhook
            ->expects($expectedWebhookUrl ? $this->once() : $this->never())
            ->method('register')
            ->with($this->identicalTo($expectedWebhookUrl), $this->identicalTo('webhook_name'), $this->identicalTo(['PersonDeleted_v1']))
        ;
        $router = $this->createMock(Router::class);
        $router
            ->expects($this->any())
            ->method('generate')
            ->with($this->identicalTo('slashid.webhook'))
            ->willReturnCallback(
                fn(string $name, array $parameters = [], int $referenceType = Router::ABSOLUTE_PATH): string => Router::ABSOLUTE_PATH === $referenceType ? '/webhook' : 'https://localhost/webhook',
            )
        ;

        $response = (new WebhookRegistrationCommand($router, $this->sdk))->execute($this->input, $this->output);
        $this->assertEquals(Command::SUCCESS, $response);
    }
}
