<?php

namespace Slashid\Symfony;

use SlashId\Php\SlashIdSdk;
use Slashid\Symfony\Controller\LoginController;
use Slashid\Symfony\Security\Authenticator;
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

            ->set('slashid.authenticator', Authenticator::class)
                ->public()
                ->args([new Reference('slashid')])
        ;
    }
}
