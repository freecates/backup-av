const staticDataUrl = process.env.NEXT_PUBLIC_STATIC_DATA_URL;
const wpDataUrl = process.env.WORDPRESS_API_URL;

const api = {
    backup: {
        async getData() {
            const response = await fetch(`${staticDataUrl}/backup.json`);
            const data = await response.json();
            return data;
        },
    },
    feature: {
        async getData() {
            const response = await fetch(`${wpDataUrl}acf/v3/feature?per_page=100`, {
                headers: { 'Cache-Control': 'no-store, max-age=0' },
            });
            const data = await response.json();
            return data;
        },
    },
    routes: {
        async getData() {
            const response = await fetch(`${staticDataUrl}/routes.json`);
            const data = await response.json();
            return data;
        },
    },
    otherRoutes: {
        async getData() {
            const response = await fetch(`${staticDataUrl}/otherRoutes.json`);
            const data = await response.json();
            return data;
        },
    },
    clientsPage: {
        async getData() {
            const response = await fetch(`${staticDataUrl}clients.json`);
            const data = await response.json();
            return data;
        },
    },
    clientData: {
        async getData() {
            const response = await fetch(`${wpDataUrl}acf/v3/client?per_page=100`, {
                headers: { 'Cache-Control': 'no-store, max-age=0' },
            });
            const data = await response.json();
            return data;
        },
    },
    projectData: {
        async getData() {
            const response = await fetch(`${wpDataUrl}wp/v2/projects?per_page=100`, {
                headers: { 'Cache-Control': 'no-store, max-age=0' },
            });
            const data = await response.json();
            return data;
        },
    },
    singleProjectData: {
        async getData(id) {
            const response = await fetch(`${wpDataUrl}wp/v2/projects/${id}?_embed`, {
                headers: { 'Cache-Control': 'no-store, max-age=0' },
            });
            const data = await response.json();
            return data;
        },
    },
    staticPages: {
        async getData(id) {
            const response = await fetch(`${wpDataUrl}wp/v2/pages?per_page=100`, {
                headers: { 'Cache-Control': 'no-store, max-age=0' },
            });
            const data = await response.json();
            return data;
        },
    },
    contacta: {
        async getData() {
            const response = await fetch(`${staticDataUrl}/contacta.json`);
            const data = await response.json();
            return data;
        },
    },
};

export default api;
