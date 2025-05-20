export const MEGABYTE = 1048576

export const byteToMB = (bytes: number, raw: boolean = false) => {
  const MB = bytes / MEGABYTE
  return raw ? MB : `${MB.toFixed(2)} MB`
}

export type TFilePreview = {
  file: File
  preview: string
}

export const toFilePreview = (file: File): TFilePreview => ({
  file,
  preview: URL.createObjectURL(file)
})

export const getFileKey = (file: File) =>
  `${file.name}_${file.size}_${file.lastModified}`

export const flattenExtensions = (accept: {
  [key: string]: readonly string[]
}): string =>
  Object.entries(accept)
    .map(([type, extensions]) => `${type} (${extensions.join(', ')})`)
    .join(', ')
