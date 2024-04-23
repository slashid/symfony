<?php

namespace Slashid\Symfony;

use SlashId\Php\SlashIdSdk;
use Slashid\Symfony\Command\Webhook\WebhookDeletionCommand;
use Slashid\Symfony\Command\Webhook\WebhookListCommand;
use Slashid\Symfony\Command\Webhook\WebhookRegistrationCommand;
use Slashid\Symfony\Controller\LoginController;
use Slashid\Symfony\Controller\WebhookController;
use Slashid\Symfony\Security\StatefulAuthenticator;
use Slashid\Symfony\Security\UserProvider;
use Symfony\Component\Config\Definition\Configurator\DefinitionConfigurator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\HttpKernel\Bundle\AbstractBundle;

class SlashIdSymfonyBundle extends AbstractBundle
{
    protected string $name = 'slashid';

    public function configure(DefinitionConfigurator $definition): void
    {
        $definition->import('../config/definition.php');
    }

    public function loadExtension(array $config, ContainerConfigurator $container, ContainerBuilder $builder): void
    {
        $container->services()

            ->set(LoginController::class)
                ->public()
                ->args([
                    new Reference('twig'),
                    new Reference('security.helper'),
                    new Reference('slashid'),
                ])

            ->set(WebhookController::class)
                ->public()
                ->args([
                    new Reference('cache.app'),
                    new Reference('event_dispatcher'),
                    new Reference('request_stack'),
                    new Reference('slashid'),
                ])

            ->set(WebhookListCommand::class)
                ->args([
                    new Reference('slashid'),
                ])
                ->tag('console.command', ['command' => 'slashid:webhook:list'])

            ->set(WebhookRegistrationCommand::class)
                ->args([
                    new Reference('router'),
                    new Reference('slashid'),
                ])
                ->tag('console.command', ['command' => 'slashid:webhook:register'])

            ->set(WebhookDeletionCommand::class)
                ->args([
                    new Reference('slashid'),
                ])
                ->tag('console.command', ['command' => 'slashid:webhook:delete'])

            ->set('slashid', SlashIdSdk::class)
                ->public()
                ->args([
                    $config['connection']['environment'],
                    $config['connection']['organization_id'],
                    $config['connection']['api_key'],
                ])

            ->set('slashid.user_provider', UserProvider::class)
                ->public()
                ->args([new Reference('slashid')])

            ->set('slashid.authenticator.stateful', StatefulAuthenticator::class)
                ->public()
                ->args([new Reference('slashid')])
        ;
    }
}
