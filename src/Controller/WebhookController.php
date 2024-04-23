<?php

namespace Slashid\Symfony\Controller;

use SlashId\Php\SlashIdSdk;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use WebhookEvent;

class WebhookController
{
    public function __construct(
        protected FilesystemAdapter $cache,
        protected EventDispatcher $dispatcher,
        protected RequestStack $requestStack,
        protected SlashIdSdk $sdk,
    )
    {}

    public function webhook(): Response
    {
        $decoded = $this->sdk->webhook()->decodeWebhookCall($this->requestStack->getCurrentRequest()->getContent(), $this->cache);

        if (
            ! is_array($decoded['trigger_content']) ||
            empty($decoded['trigger_content']['event_metadata']) ||
            ! is_array($decoded['trigger_content']['event_metadata']) ||
            empty($decoded['trigger_content']['event_metadata']['event_name']) ||
            ! is_string($decoded['trigger_content']['event_metadata']['event_name']) ||
            empty($decoded['trigger_content']['event_metadata']['event_id']) ||
            ! is_string($decoded['trigger_content']['event_metadata']['event_id'])
        ) {
            throw new BadRequestException('Invalid Webhook call: missing trigger_content->event_metadata->event_name and trigger_content->event_metadata->event_id.');
        }

        // Dispatch an event with the webhook event.
        $this->dispatcher->dispatch(new WebhookEvent(
            $decoded['trigger_content']['event_metadata']['event_name'],
            $decoded['trigger_content']['event_metadata']['event_id'],
            $decoded['trigger_content'],
        ));

        return new Response('ok');
    }
}
