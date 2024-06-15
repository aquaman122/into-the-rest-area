declare global {
  interface Window {
    _ENV: any;
  }
}

const { SERVER_API_URL = '' } = window._ENV ?? process.env;

export { SERVER_API_URL };
