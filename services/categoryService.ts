import apiBaseUrl from "./config";

class CategoryService {
    getCategoryEndpoint(endpoint: string) {
        return `${apiBaseUrl}/categories/${endpoint.length < 1 ? '' : endpoint + '/'}`;
    }

    async getAllCategories () {
        try {
            const res = await fetch(`${this.getCategoryEndpoint('')}`, {
                method: 'GET',
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = jsonRes[Object.keys(jsonRes || {})[0]] ?? 'Something went wrong. Please try again later';
                throw Error(errorMsg);
            }

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }
}

export {
    CategoryService,
}