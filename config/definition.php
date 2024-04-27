<?php

use Symfony\Component\Config\Definition\Configurator\DefinitionConfigurator;
use Symfony\Component\Translation\Loader\ArrayLoader;
use Symfony\Component\Yaml\Yaml;

return static function (DefinitionConfigurator $definition) {
    // Lists the strings IF the package symfony/translation exists.
    $translationStrings = NULL;
    if (class_exists(ArrayLoader::class)) {
        $stringsFromYaml = Yaml::parse(file_get_contents(__DIR__ . '/../translations/SlashIdSymfonyBundle.en.yml'));
        $catalogue = (new ArrayLoader())->load($stringsFromYaml, 'en', 'SlashIdSymfonyBundle');
        $translationStrings = array_keys($catalogue->all('SlashIdSymfonyBundle'));
    }

    $definition->rootNode()->children()
        ->scalarNode('environment')
            ->defaultValue('%env(trim:string:SLASHID_ENVIRONMENT)%')
            ->cannotBeOverwritten()
            ->end()
        ->scalarNode('organization_id')
            ->defaultValue('%env(trim:string:SLASHID_ORGANIZATION_ID)%')
            ->cannotBeOverwritten()
            ->end()
        ->scalarNode('api_key')
            ->defaultValue('%env(trim:string:SLASHID_API_KEY)%')
            ->cannotBeOverwritten()
            ->end()
        ->variableNode('translation_strings')
            ->defaultValue($translationStrings)
            ->cannotBeOverwritten()
            ->end()

        ->scalarNode('route_after_login')
            ->end()

        ->arrayNode('login_form')->addDefaultsIfNotSet()->children()
            ->booleanNode('analytics')
                ->defaultTrue()
                ->end()
            ->booleanNode('override_bundled_javascript')
                ->defaultFalse()
                ->end()
            ->booleanNode('override_javascript_glue')
                ->defaultFalse()
                ->end()
            ->variableNode('configuration')
                ->defaultValue([])
                ->end()
            ->variableNode('css_override')
                ->defaultValue([])
                ->end()
        ->end()
    ->end();
};
