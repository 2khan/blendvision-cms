export type TPresignedURLPayload = {
  filename: string
  content_type: string
}

export type TPresignedURLResponse = {
  presigned_url: string
  original: string
  thumbnail: string
}
