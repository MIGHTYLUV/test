import { HttpError } from 'wasp/server'

export const getUserUploads = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Upload.findMany({
    where: {
      user: { id: context.user.id }
    }
  });
}
