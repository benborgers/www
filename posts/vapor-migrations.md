---
layout: ../../layouts/post.astro
title: "How to run migrations automatically on Laravel Vapor"
date: 2021-01-24
---
You can't run database migrations manually when a Laravel app is in production. Instead, define a deploy hook in `vapor.yml`:

```yaml
# Not a full vapor.yml configuration

environments:
  production:
    deploy:
      - 'php artisan migrate --force'
```

The `--force` flag confirms that you're okay with running destructive migrations, such as deleting a column.

Vapor will run this command before the deployment is finalized, making any necessary changes to the production database.