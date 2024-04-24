<?php

namespace SlashId\Symfony\Event;

use Symfony\Contracts\EventDispatcher\Event;

final class WebhookEvent extends Event
{
    /**
     * Create a new event instance.
     *
     * @param string  $eventName      the name of the, such as "PersonDeleted_v1"
     * @param string  $eventId        the event ID, such as "68a850ca-b2ee-46ce-8592-410813037739"
     * @param mixed[] $triggerContent the contents of the "trigger_content" part of the body of the webhook request
     */
    public function __construct(
        protected string $eventName,
        protected string $eventId,
        protected array $triggerContent,
    ) {}

    public function getEventName(): string
    {
        return $this->eventName;
    }

    public function getEventId(): string
    {
        return $this->eventId;
    }

    /**
     * Returns the contents of the webhook call.
     *
     * @return mixed[] the contents of the "trigger_content" part of the body of the webhook request
     */
    public function getTriggerContent(): array
    {
        return $this->triggerContent;
    }
}
