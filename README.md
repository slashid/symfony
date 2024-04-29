# Symfony SlashID Integration Bundle

## Installation

1. Install the Symfony SlashID packaged with composer:

```
composer require slashid/symfony
```

2. Edit your environment file, `.env`, adding the following variables to the end of the file:
    * `SLASHID_ENVIRONMENT`, either `sandbox` or `production`
    * `SLASHID_ORGANIZATION_ID`, your organization's ID. You'll find it in your SlashID console (https://console.slashid.dev/ for production, https://console.sandbox.slashid.dev/ for sandbox), in the "Settings" tab, on the top of the page.
    * `SLASHID_API_KEY`, your organization's API Key. You'll also find it in your SlashID console, in the "Settings" tab, at the very bottom of the page.

```conf
# .env

SLASHID_ENVIRONMENT=sandbox
SLASHID_ORGANIZATION_ID=412edb57-ae26-f2aa-9999-770021ed52d1
SLASHID_API_KEY=z0dlY-nluiq8mcvm8YTolSkJV6e9
```

3. Run the Symfony command to publish the bundle assets:

```bash
php bin/console assets:install
```

4. Edit `config/routes.yaml` and add this to the end of it:

```yaml
# config/routes.yaml

_slashid_symfony_bundle:
    resource: '@slashid/config/routes.yaml'
```

5. Edit `config/packages/security.yaml` to add the following references to SlashID:

```yaml
# config/packages/security.yaml

security:
    providers:
        slashid:
          id: slashid.user_provider

    firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false
        main:
            lazy: true
            provider: slashid
            custom_authenticators:
                - slashid.authenticator
            logout:
                path: /logout

```

You're ready! Now access `/login` in your website and enjoy your new login with SlashID :)

### Stateless Login

If your Symfony installation acts as an API backend (for a React application, for instance), you will probably want to configure stateless login. To do that, just add `stateless: true` to the firewall configuration, for instance:

```yaml
# config/packages/security.yaml

security:
    # ................
    firewalls:
        api:
            pattern: ^/api
            provider: slashid
            custom_authenticators:
                - slashid.authenticator
            stateless: true
        main:
            lazy: true
            provider: slashid
            custom_authenticators:
                - slashid.authenticator
```

In the example above, any requests to `/api/****` will be logged in by sending the SlashID token in a `Authorization: Bearer <<TOKEN>>` header. All other routes will be logged in with a cookie.

:warning: **Attention!** If you do not add `stateless: true`, requests with a `Authorization: Bearer <<TOKEN>>` header WILL create a cookie login.

## Groups

### Group-based access in routes

The groups in SlashID are exposed as Symfony roles. So, for instance, if you have a group named "Editor", the user will have the role `ROLE_EDITOR`.

You can protected routes by SlashID groups editing `security.yaml` like this:


```yaml
# config/packages/security.yaml

security:
    # ..........

    access_control:
        - { path: "^/editor", roles: ROLE_EDITOR }
        - { path: ^/admin, roles: ROLE_ADMIN }
```

:warning: **Attention!** All group names will be capitalized, so groups named "Editor", "editor" and "EDITOR" will all be transcribed as `ROLE_EDITOR`.

### Group-checking in custom code


If you want to check the groups of a user in your custom code, you can use any of the group-related methods of the `\SlashId\Symfony\SlashIdUser` class, e.g.:

```php
// src/Controller/MyCustomController.php

namespace App\Controller;

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{

    #[Route('/my-test-route')]
    public function testRoute(): Response
    {
        /** @var \SlashId\Symfony\SlashIdUser */
        $user = $this->getUser();

        if ($user->hasGroup('Editor')) {
            // Do things that only an "Editor" user can do.
        }

        if ($user->hasAnyGroup(['Admin', 'Editor', 'Reviewer'])) {
            // Do things that someone in the group "Admin", OR in the group
            // "Editor", OR in the group "Reviewer" can do.
        }

        if ($user->hasAllGroups(['Admin', 'Editor'])) {
            // Do things that only someone that is in *both* "Admin" and
            // "Editor" groups can do.
        }

        // Shows the user groups as a list of strings.
        dd($user->getGroups());
    }
}

```

### Group-checking in Twig

You can also use the `hasGroup` / `hasAnyGroup` / `hasAllGroups` methods to build Twig templates that display different things depending on the groups the user belongs to.

```twig
{# templates/test.html.twig #}

{% if app.user %}

    <p>You are logged in</p>

    {% if app.user.hasGroup('Editor') %}
        <p>Information Editors can access.</p>

    {% endif %}

    {% if app.user.hasGroup('Admin') %}

        <p>Information Admins can access.</p>

    {% endif %}

    {% if app.user.hasAnyGroup(['Admin', 'Editor']) %}

        <p>Information both Editors and Admins can access.</p>

    {% endif %}

    {{ dump(app.user.getGroups()) }}

{% else %}

    <p>You are NOT logged in</p>

{% endif %}

```
