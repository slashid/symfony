<?php

use Symfony\Contracts\EventDispatcher\Event;

final class WebhookEvent extends Event {
    /**
     * Create a new event instance.
     *
     * @param  string  $eventName  The name of the, such as "PersonDeleted_v1".
     * @param  string  $eventId  The event ID, such as "68a850ca-b2ee-46ce-8592-410813037739".
     * @param  mixed[]  $triggerContent  The contents of the "trigger_content" part of the body of the webhook request.
     */
    public function __construct(
        protected string $eventName,
        protected string $eventId,
        protected array $triggerContent,
    ) {
    }

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
     * @return mixed[] The contents of the "trigger_content" part of the body of the webhook request.
     */
    public function getTriggerContent(): array
    {
        return $this->triggerContent;
    }
}
