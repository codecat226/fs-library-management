import multer from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination: function (
    req: Express.Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ): void {
    cb(null, 'public/images')
  },
  filename: function (
    req: Express.Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

export const upload = multer({ storage: storage })
