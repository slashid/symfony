<?php

namespace SlashId\Test\Symfony\Command\Webhook;

use PHPUnit\Framework\Attributes\CoversClass;
use SlashId\Symfony\Command\Webhook\WebhookListCommand;
use SlashId\Test\Symfony\Command\CommandTestCase;
use Symfony\Component\Console\Command\Command;

#[CoversClass(WebhookListCommand::class)]
class WebhookListCommandTest extends CommandTestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->sdk
            ->expects($this->once())
            ->method('getOrganizationId')
            ->willReturn('8888-8888-8888');
    }

    public function testExecuteNone(): void
    {
        $this->webhook
            ->expects($this->once())
            ->method('findAll')
            ->willReturn([])
        ;
        $this->output
            ->expects($this->once())
            ->method('writeln')
            ->with($this->identicalTo('No webhooks found for organization 8888-8888-8888'))
        ;

        $response = (new WebhookListCommand($this->sdk))->execute($this->input, $this->output);
        $this->assertEquals(Command::SUCCESS, $response);
    }

    public function testExecuteSome(): void
    {
        $this->webhook
            ->expects($this->once())
            ->method('findAll')
            ->willReturn([
                [
                    'id' => '7777-7777-7777',
                    'name' => 'my_webhook',
                    'target_url' => 'slashid/webhook',
                ],
            ])
        ;
        $this->webhook
            ->expects($this->once())
            ->method('getWebhookTriggers')
            ->with($this->identicalTo('7777-7777-7777'))
            ->willReturn(['PersonDeleted_v1'])
        ;
        $this->output
            ->expects($this->exactly(6))
            ->method('writeln')
        ;

        $response = (new WebhookListCommand($this->sdk))->execute($this->input, $this->output);
        $this->assertEquals(Command::SUCCESS, $response);
    }
}
