<?php

namespace SlashId\Symfony;

use SlashId\Php\SlashIdSdk;
use SlashId\Symfony\Controller\LoginController;
use SlashId\Symfony\Security\Authenticator;
use SlashId\Symfony\Security\UserProvider;
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

    /**
     * @param string[][] $config
     */
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
