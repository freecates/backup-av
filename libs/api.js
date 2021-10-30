const staticDataUrl = process.env.NEXT_PUBLIC_STATIC_DATA_URL;

const api = {
  backup: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/backup.json`);
      const data = await response.json();
      return data;
    }
  },
  features: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/features.json`);
      const data = await response.json();
      return data;
    }
  },
  routes: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/routes.json`);
      const data = await response.json();
      return data;
    }
  },
  clients: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/clients.json`);
      const data = await response.json();
      return data;
    }
  },
  contacta: {
    async getData() {
      const response = await fetch(`${staticDataUrl}/contacta.json`);
      const data = await response.json();
      return data;
    }
  },
};


export default api;