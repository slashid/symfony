<?php

namespace SlashId\Test\Symfony\Controller;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Psr\Cache\CacheItemPoolInterface;
use SlashId\Php\Abstraction\WebhookAbstraction;
use SlashId\Php\SlashIdSdk;
use SlashId\Symfony\Controller\WebhookController;
use SlashId\Symfony\Event\WebhookEvent;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

#[CoversClass(WebhookController::class)]
class WebhookControllerTest extends TestCase
{
    /**
     * Data provider for testListen().
     */
    public static function dataProviderTestListen(): array
    {
        return [
            [
                [
                    'trigger_content' => [
                        'event_metadata' => [
                            'event_id' => '9999-9999',
                            'event_name' => 'SlashIDSDKLoaded_v1',
                        ],
                    ],
                ],
                false,
            ],
            [
                [
                    'trigger_content' => [
                        'event_metadata' => [
                            'event_id' => 123,
                            'event_name' => 'SlashIDSDKLoaded_v1',
                        ],
                    ],
                ],
                true,
            ],
            [
                [
                    'trigger_content' => [
                        'event_metadata' => [
                            'event_name' => 'SlashIDSDKLoaded_v1',
                        ],
                    ],
                ],
                true,
            ],
            [
                [
                    'trigger_content' => [
                        'event_metadata' => [
                            'event_id' => '9999-9999',
                            'event_name' => 123,
                        ],
                    ],
                ],
                true,
            ],
            [
                [
                    'trigger_content' => [
                        'event_metadata' => [
                            'event_id' => '9999-9999',
                        ],
                    ],
                ],
                true,
            ],
            [
                [
                    'trigger_content' => [
                        'event_metadata' => 123,
                    ],
                ],
                true,
            ],
            [
                [
                    'trigger_content' => [],
                ],
                true,
            ],
        ];
    }

    #[DataProvider('dataProviderTestListen')]
    public function testListen(array $decodedCall, bool $expectsException): void
    {
        $cache = $this->createMock(CacheItemPoolInterface::class);

        /** @var WebhookAbstraction&\PHPUnit\Framework\MockObject\MockObject */
        $webhook = $this->createConfiguredStub(WebhookAbstraction::class, [
            'decodeWebhookCall' => $decodedCall,
        ]);
        /** @var SlashIdSdk */
        $sdk = $this->createConfiguredStub(SlashIdSdk::class, [
            'webhook' => $webhook,
        ]);
        /** @var RequestStack */
        $requestStack = $this->createConfiguredStub(RequestStack::class, [
            'getCurrentRequest' => new Request(),
        ]);

        $dispatcher = $this->createMock(EventDispatcher::class);
        $dispatcher
            ->expects($expectsException ? $this->never() : $this->once())
            ->method('dispatch')
            ->with($this->isInstanceOf(WebhookEvent::class));

        if ($expectsException) {
            $this->expectException(BadRequestException::class);
        }

        (new WebhookController($cache, $dispatcher, $requestStack, $sdk))->webhook();
    }
}
