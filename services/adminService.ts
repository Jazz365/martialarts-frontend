import apiBaseUrl from "./config";
import { makeAxiosGetRequest, makeAxiosPostRequest, makeGetRequest } from "./functions";

class AdminService {
    private getAdminEndpoint(endpoint: string, searchParams?: string | null | undefined) {
        return `${apiBaseUrl}/adminpanel/${endpoint.length < 1 ? '' : endpoint + '/'}${searchParams ?? ''}`;
    }

    async getDashboardData (token?: string | null) {
        try {
            const res = await makeGetRequest(
                `${this.getAdminEndpoint('dashboard')}`,
                {
                    'Authorization': `Token ${token}`,
                },
            );
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getAllPlaces (token?: string | null) {
        try {
            const res = await makeGetRequest(
                `${this.getAdminEndpoint('places')}`,
                {
                    'Authorization': `Token ${token}`,
                },
            );
            return res;
        } catch (error) {
            throw error;
        }
    }

    async updatePlaceFeaturedStatus (
        token: string,
        placeId: number,
        featureType: 'feature' | 'unfeature',
        data={},
    ) {
        try {
            const res = await makeAxiosPostRequest(
                `${this.getAdminEndpoint(`places/${placeId}/${featureType}`)}`,
                data,
                {
                    'Authorization': `Token ${token}`,
                }
            );
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getAllBookings (token?: string | null) {
        try {
            const res = await makeGetRequest(
                `${this.getAdminEndpoint('bookings')}`,
                {
                    'Authorization': `Token ${token}`,
                },
            );
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getBookingsReport (token?: string | null, searchParams?: string) {
        try {
            const res = await makeAxiosGetRequest(
                `${this.getAdminEndpoint('reports/bookings', searchParams)}`,
                {
                    'Authorization': `Token ${token}`,
                },
            );
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getPlacesReport (token?: string | null, searchParams?: string) {
        try {
            const res = await makeGetRequest(
                `${this.getAdminEndpoint('reports/places', searchParams)}`,
                {
                    'Authorization': `Token ${token}`,
                },
            );
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getUsersReport (token?: string | null, searchParams?: string) {
        try {
            const res = await makeGetRequest(
                `${this.getAdminEndpoint('reports/users', searchParams)}`,
                {
                    'Authorization': `Token ${token}`,
                },
            );
            return res;
        } catch (error) {
            throw error;
        }
    }
}

export {
    AdminService,
}