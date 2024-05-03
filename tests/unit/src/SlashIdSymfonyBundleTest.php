<?php

namespace SlashId\Test\Symfony\Security;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;
use SlashId\Php\SlashIdSdk;
use SlashId\Symfony\Command\Migration\MigrationScriptCreationCommand;
use SlashId\Symfony\Command\Migration\UserMigrationCommand;
use SlashId\Symfony\Command\Webhook\WebhookDeletionCommand;
use SlashId\Symfony\Command\Webhook\WebhookListCommand;
use SlashId\Symfony\Command\Webhook\WebhookRegistrationCommand;
use SlashId\Symfony\Controller\LoginController;
use SlashId\Symfony\Controller\WebhookController;
use SlashId\Symfony\SlashIdSymfonyBundle;
use Symfony\Component\Config\Definition\Configurator\DefinitionConfigurator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\DependencyInjection\Loader\PhpFileLoader;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBag;

#[CoversClass(SlashIdSymfonyBundle::class)]
class SlashIdSymfonyBundleTest extends TestCase
{
    public function testConfigure(): void
    {
        $definition = $this->createMock(DefinitionConfigurator::class);
        $definition
            ->expects($this->once())
            ->method('import')
            ->with($this->identicalTo('../config/definition.php'))
        ;
        (new SlashIdSymfonyBundle())->configure($definition);
    }

    public function testLoadExtension(): void
    {
        $config = [
            'environment' => SlashIdSdk::ENVIRONMENT_PRODUCTION,
            'organization_id' => 'ORG_ID',
            'api_key' => 'API_KEY',
            'translation_strings' => [],
            'route_after_login' => null,
            'login_form' => [],
            'migration_script_folder' => '/var/www/symfony/migrations/slashid',
        ];
        $parameterBag = new ParameterBag();
        $containerBuilder = new ContainerBuilder($parameterBag);
        $loader = $this->createMock(PhpFileLoader::class);
        $instanceof = [];
        $containerConfigurator = new ContainerConfigurator($containerBuilder, $loader, $instanceof, __DIR__, __FILE__);
        $builder = $this->createMock(ContainerBuilder::class);

        (new SlashIdSymfonyBundle())->loadExtension($config, $containerConfigurator, $builder);

        $this->assertEquals([
            'service_container',
            LoginController::class,
            WebhookController::class,
            WebhookListCommand::class,
            WebhookRegistrationCommand::class,
            WebhookDeletionCommand::class,
            MigrationScriptCreationCommand::class,
            UserMigrationCommand::class,
            'slashid',
            'slashid.user_provider',
            'slashid.authenticator',
        ], array_keys($containerBuilder->getDefinitions()));
        $this->assertEquals([
            SlashIdSdk::class,
        ], array_keys($containerBuilder->getAliases()));
    }
}
