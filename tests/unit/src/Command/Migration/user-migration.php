<?php

use Doctrine\ORM\EntityManagerInterface;
use SlashId\Symfony\SlashIdUser;

return static function(EntityManagerInterface $manager): array|string {
    if (!$manager->isOpen()) {
        return 'not_an_array';
    }

    if (!$manager->isFiltersStateClean()) {
        return [];
    }

    if (!$manager->hasFilters()) {
        return ['not_a_user'];
    }

    return [new SlashIdUser()];
};
