export function responseEndpoint({ data = null, message = null }) {
  return {
    data,
    message
  }
}