<?php

namespace SlashId\Test\Symfony\Command\Webhook;

use PHPUnit\Framework\Attributes\CoversClass;
use SlashId\Symfony\Command\Webhook\WebhookDeletionCommand;
use SlashId\Test\Symfony\Command\CommandTestCase;
use Symfony\Component\Console\Command\Command;

#[CoversClass(WebhookDeletionCommand::class)]
class WebhookDeletionCommandTest extends CommandTestCase
{
    public function testExecute(): void
    {
        $this->input
            ->expects($this->once())
            ->method('getArgument')
            ->with($this->identicalTo('id'))
            ->willReturn('9999-9999-9999')
        ;
        $this->webhook
            ->expects($this->once())
            ->method('deleteById')
            ->with($this->identicalTo('9999-9999-9999'))
        ;
        $this->output
            ->expects($this->once())
            ->method('writeln')
            ->with($this->identicalTo('Webhook with ID "9999-9999-9999" has been deleted.'))
        ;
        $response = (new WebhookDeletionCommand($this->sdk))->execute($this->input, $this->output);
        $this->assertEquals(Command::SUCCESS, $response);
    }
}
