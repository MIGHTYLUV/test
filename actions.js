import { HttpError } from 'wasp/server'

export const uploadContent = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const upload = await context.entities.Upload.create({
    data: {
      fileUrl: args.fileUrl,
      userId: context.user.id
    }
  });

  return upload;
}
