<?php

namespace SlashId\Symfony;

use SlashId\Php\SlashIdSdk;
use SlashId\Symfony\Command\Migration\MigrationScriptCreationCommand;
use SlashId\Symfony\Command\Migration\UserMigrationCommand;
use SlashId\Symfony\Command\Webhook\WebhookDeletionCommand;
use SlashId\Symfony\Command\Webhook\WebhookListCommand;
use SlashId\Symfony\Command\Webhook\WebhookRegistrationCommand;
use SlashId\Symfony\Controller\LoginController;
use SlashId\Symfony\Controller\WebhookController;
use SlashId\Symfony\Security\Authenticator;
use SlashId\Symfony\Security\UserProvider;
use Symfony\Component\Config\Definition\Configurator\DefinitionConfigurator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\ContainerInterface;
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

    /**
     * @param string[][] $config
     */
    public function loadExtension(array $config, ContainerConfigurator $container, ContainerBuilder $builder): void
    {
        $container->services()

            ->set(LoginController::class)
                ->public()
                ->args([
                    $config['login_form'],
                    $config['route_after_login'],
                    $config['translation_strings'],
                    new Reference('twig'),
                    new Reference('router'),
                    new Reference('security.helper'),
                    new Reference('slashid'),
                    new Reference('translator', ContainerInterface::NULL_ON_INVALID_REFERENCE),
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

            ->set(MigrationScriptCreationCommand::class)
                ->args([
                    $config['migration_script_folder'],
                    new Reference('filesystem'),
                ])
                ->tag('console.command', ['command' => 'slashid:import:create-script'])

            ->set(UserMigrationCommand::class)
                ->args([
                    $config['migration_script_folder'],
                    new Reference('doctrine.orm.default_entity_manager'),
                    new Reference('filesystem'),
                    new Reference('slashid'),
                ])
                ->tag('console.command', ['command' => 'slashid:import:run'])

            ->set('slashid', SlashIdSdk::class)
                ->public()
                ->args([
                    $config['environment'],
                    $config['organization_id'],
                    $config['api_key'],
                ])
                ->alias(SlashIdSdk::class, 'slashid')

            ->set('slashid.user_provider', UserProvider::class)
                ->public()
                ->args([new Reference('slashid')])

            ->set('slashid.authenticator', Authenticator::class)
                ->public()
                ->args([new Reference('slashid')])
        ;
    }
}
