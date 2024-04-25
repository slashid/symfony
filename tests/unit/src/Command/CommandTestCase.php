<?php

namespace SlashId\Test\Symfony\Command;

use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use SlashId\Php\Abstraction\WebhookAbstraction;
use SlashId\Php\SlashIdSdk;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CommandTestCase extends TestCase
{
    protected InputInterface&MockObject $input;
    protected OutputInterface&MockObject $output;
    protected SlashIdSdk&MockObject $sdk;
    protected WebhookAbstraction&MockObject $webhook;

    public function setUp(): void
    {
        $this->input = $this->createMock(InputInterface::class);
        $this->output = $this->createMock(OutputInterface::class);
        $this->sdk = $this->createMock(SlashIdSdk::class);
        $this->webhook = $this->createMock(WebhookAbstraction::class);

        $this->sdk
            ->expects($this->any())
            ->method('webhook')
            ->willReturn($this->webhook)
        ;
    }
}
