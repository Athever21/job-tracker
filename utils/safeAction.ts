export function safeAction<T>(fn: (prevState: any, formData: FormData) => Promise<T | null>) {
  return async (prevState: any, formData: FormData) => {
    try {
      return await fn(prevState, formData);
    } catch (err) {
      console.error(err)
      return { error: 'Unexpected error' }
    }
  }
}
