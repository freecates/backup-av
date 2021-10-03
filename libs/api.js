const staticDataUrl = process.env.STATIC_DATA_URL;

const api = {
  routes: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/routes.json`);
      const data = await response.json();
      return data;
    }
  },
};


export default api;