import { useCurrentUser } from 'src/shared/hooks/client/use-user';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const handleAuth = () => {
  const user = useCurrentUser();
  if (!user) throw new UploadThingError('Unauthorized');
  return { userId: user.id };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: '4MB' } })
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
  courseAttachment: f(['video', 'text', 'blob', 'image', 'audio'])
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
  champVideo: f({ video: { maxFileSize: '512GB', maxFileCount: 1 } })
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
