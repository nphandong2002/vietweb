import { Liveblocks } from '@liveblocks/node';
import { auth } from 'src/auth';

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  const authorization = await auth();

  if (!authorization || !authorization.user?.id)
    return new Response('Unauthorized', { status: 403 });

  const { room } = await request.json();
  const user = authorization.user;

  const userInfo = {
    name: user.name || 'Teammeate',
    picture: user.image,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
