<?php

namespace SlashId\Symfony\Controller;

use Psr\Cache\CacheItemPoolInterface;
use Psr\EventDispatcher\EventDispatcherInterface;
use SlashId\Php\SlashIdSdk;
use SlashId\Symfony\Event\WebhookEvent;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;

class WebhookController
{
    public function __construct(
        protected CacheItemPoolInterface $cache,
        protected EventDispatcherInterface $dispatcher,
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
