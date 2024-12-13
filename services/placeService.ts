import { toast } from "sonner";
import apiBaseUrl from "./config"

class PlaceService {
    getAuthEndpoint(endpoint: string) {
        return `${apiBaseUrl}/places/${endpoint.length < 1 ? '' : endpoint + '/'}`;
    }

    async createNewPlace (token: string, data={}) {
        try {
            const res = await fetch(`${this.getAuthEndpoint('create')}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = jsonRes[Object.keys(jsonRes || {})[0]] ?? 'Something went wrong. Please try again later';
                console.log(errorMsg);
                
                // toast.error(errorMsg as string);
                
                throw Error(errorMsg);
            }

            toast.success('Successfully created new place!');

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }
}

export {
    PlaceService,
}