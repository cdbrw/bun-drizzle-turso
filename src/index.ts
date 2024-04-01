import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { deleteUser, getUserWithPosts, insertUser } from './functions/users';
import { insertPost, updatePost } from './functions/posts';

const users = new Elysia({ prefix: '/user' })
  .get(
    '/:id/posts',
    ({ params: { id } }) => {
      return getUserWithPosts(id);
    },
    {
      params: t.Object({ id: t.Numeric() }),
    }
  )
  .post(
    '/',
    ({ body: { name, email } }) => {
      return insertUser({ name, email });
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
      }),
    }
  )
  .delete(
    '/',
    ({ body: { id } }) => {
      return deleteUser(id);
    },
    { body: t.Object({ id: t.Numeric() }) }
  );

const posts = new Elysia({ prefix: '/post' })
  .post(
    '/',
    ({ body: { title, content, userId } }) => {
      return insertPost({ title, content, userId });
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.String(),
        userId: t.Numeric(),
      }),
    }
  )
  .patch(
    '/:id',
    ({ params: { id }, body: { title, content } }) => {
      return updatePost(id, { title, content });
    },
    {
      params: t.Object({ id: t.Numeric() }),
      body: t.Object({ title: t.String(), content: t.String() }),
    }
  );

const app = new Elysia()
  .use(swagger({ path: '/docs' }))
  .group('/api', (app) => app.use(users).use(posts))
  .listen(process.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
