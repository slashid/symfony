<?php

namespace SlashId\Development\Symfony;

use Symfony\Component\Yaml\Yaml;

/**
 * Script to generate `translations/SlashIdSymfonyBundle.en.yml` from React JSON, to be used for development only.
 */
final class TranslationYamlGenerator
{
    public const SOURCE_URL = 'https://raw.githubusercontent.com/slashid/javascript/main/packages/react/src/components/text/constants.ts';

    public static function generate(): void
    {
        self::assertDevelopmentEnvironment();

        // Downloads file and converts TypeScript into JSON.
        $source = file_get_contents(self::SOURCE_URL);
        if (!$source) {
            throw new \Exception('Could not locate ' . self::SOURCE_URL);
        }
        $jsonStartPosition = strpos($source, '{');
        $jsonEndPosition = strpos($source, '};');
        $source = substr($source, $jsonStartPosition + 1, $jsonEndPosition - $jsonStartPosition - 1);
        $sourceLines = explode("\n", $source);
        $sourceLines = array_values(array_filter($sourceLines, fn($line) => 0 === strpos(trim($line), '"')));

        // Remove comma in the last line, to make JSON valid.
        /** @var string */
        $lastLine = array_pop($sourceLines);
        $lastLine = trim($lastLine, "\n\r\t\v\0,");
        $sourceLines[] = $lastLine;

        // Reconstructs the JSON and makes it into a string.
        $validJson = '{' . implode("\n", $sourceLines) . '}';
        /** @var string[] */
        $strings = json_decode($validJson, true);

        // Removes invalid string.
        unset($strings['']);

        // Customize strings for Symfony.
        $strings = [
            'initial.title' => 'Welcome',
            'success.title' => 'Completing authentication...',
            'success.subtitle' => "You'll be logged in in a few moments",
        ] + $strings;

        // Writes Yaml.
        file_put_contents(__DIR__ . '/../../translations/SlashIdSymfonyBundle.en.yml', Yaml::dump($strings, 100));
    }

    /**
     * Prevents running this script inside a package.
     */
    private static function assertDevelopmentEnvironment(): void
    {
        if (!file_exists(__DIR__ . '/../../vendor/autoload.php')) {
            throw new \Exception('You must run this script only on a standalone repository.');
        }
    }
}
