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

## Webhooks

See [SlashID documentation on Webhooks](https://developer.slashid.dev/docs/access/guides/webhooks/introduction).

### Artisan webhook commands

To use webhooks, you need first to register your URL with SlashID. Webhooks are managed via API, but this package provides three Artisan commands to help you manage them.

#### How to register webhooks

To register a new webhook for the current website use the following command. You are required to define a unique name for it, in this example, we're using `my_webhook`.

```
php bin/console slashid:webhook:register my_webhook
```

By default, the webhook is registered with the triggers: `PersonDeleted_v1`, `PersonLoggedOut_v1`, and `PasswordChanged_v1`. You can specify which triggers to register, listing the triggers separated by space:

```
php bin/console slashid:webhook:register my_webhook PasswordChanged_v1 VirtualPageLoaded_v1 AuthenticationFailed_v1
```

You can run `slashid:webhook:register` as many times as you want, if there is already a webhook registered to that URL, it will be updated and the list of triggers will be overridden.

#### How to test webhooks locally

You can test webhooks in your local development environment with a tool such as [ngrok](https://ngrok.com/), then use the option `--base-url` to register a webhook with the proxy.

For instance, if you are running Symfony on port 8080, you can proxy your local environment with ngrok with:

```
ngrok http 8000
```

The ngrok command-line will then display data about your proxy, such as:

```
Forwarding                    https://2f45-2804-14c-483-983f-b323-32f2-4714-1609.ngrok-free.app -> http://localhost:8000
```

Then, you can register a web service to the proxy URL, with the following command:

```
php bin/console slashid:webhook:register proxied_webhook PasswordChanged_v1 --base-url=https://2f45-2804-14c-483-983f-b323-32f2-4714-1609.ngrok-free.app
```

#### How to register webhooks for other applications

You can use the artisan command to register webhooks with any arbitrary URL:

```
php bin/console slashid:webhook:register proxied_webhook PasswordChanged_v1 --webhook-url=https://someotherapplication.example.com/some-arbitrary-url
```

### How to see existing webhooks

You can see all webhooks registered to your SlashID organization with the command:

```
php bin/console slashid:webhook:list
```

#### How to delete a webhook

You can delete a webhook by its ID.

```
php bin/console slashid:webhook:delete 065e5237-c1c4-7a96-ab00-783ef0cbd002
```

To learn a webhook ID, use the `slashid:webhook:list` command.

### Listening to events

Any received webhook will be made available to the developer as a [Symfony event](https://symfony.com/doc/current/event_dispatcher.html).

To listen to webhook events in your Symfony application, create a class in the `src/EventListener` folder of your application. In the example below, we are naming it `WebhookEventListener`, but you can name it as you like.

```php
// src/EventListener/WebhookEventListener.php

namespace App\EventListener;

use SlashId\Symfony\Event\WebhookEvent;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener]
class WebhookEventListener
{
    public function __invoke(WebhookEvent $event): void
    {
        print_r([
            $event->getEventName(),
            $event->getEventId(),
            $event->getTriggerContent(),
        ]);
    }
}
```

The listener will receive the event of class `\SlashId\Symfony\Event\WebhookEvent`. It has three methods you can use to extract information about the webhook call:

* `$event->getEventName()` will return the trigger name, such as `AuthenticationFailed_v1`, that is, `->trigger_content->event_metadata->event_name` in the JSON sent to the webhook.
* `$event->getEventId()` will return the event ID, such as `68a850ca-b2ee-46ce-8592-410813037739`, that is, `->trigger_content->event_metadata->event_id` in the JSON sent to the webhook.
* `$event->getTriggerContent()` will return the full content of the webhook call, that is, `->trigger_content` in the JSON sent to the webhook.
