<?php

namespace SlashId\Symfony\Event;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;

#[CoversClass(WebhookEvent::class)]
class WebhookEventTest extends TestCase
{
    public function testEvent(): void
    {
        $event = new WebhookEvent('event_name', '999-999-999', ['content' => 'trigger']);
        $this->assertEquals('event_name', $event->getEventName());
        $this->assertEquals('999-999-999', $event->getEventId());
        $this->assertEquals(['content' => 'trigger'], $event->getTriggerContent());
    }
}
