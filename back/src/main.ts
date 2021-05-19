import { makeApp } from './make_app';

async function bootstrap() {
  const app = await makeApp();

  await app.listen(3000, '0.0.0.0');
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
