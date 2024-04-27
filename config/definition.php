<?php

use Symfony\Component\Config\Definition\Configurator\DefinitionConfigurator;

return static function (DefinitionConfigurator $definition) {
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

        ->arrayNode('login_form')->children()
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
                ->end()
        ->end()
    ->end();
};
