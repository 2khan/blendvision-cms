export const normalizeArray = (value: unknown) => {
  return value && Array.isArray(value) ? value : []
}
