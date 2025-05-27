import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ZodError } from 'zod'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const errorHandler = (e: Error) => {
  if (e instanceof ZodError) {
    e.errors.forEach((issue) => {
      toast.error(issue.message)
    })
  }

  if (e instanceof AxiosError) {
    console.error(e.message)
  }
}

export const downloadFile = (url: string) => {
  const link = document.createElement('a')
  link.href = url
  link.click()
  link.remove()
}
