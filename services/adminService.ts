import axios, { AxiosError } from "axios";
import apiBaseUrl from "./config";
import { makeAxiosGetRequest, makeAxiosPostRequest, makeGetRequest } from "./functions";
import { toast } from "sonner";

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
            const res = await axios.get(
                `${this.getAdminEndpoint('places')}`,
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                },
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async createNewPlace (token: string, data={}): Promise<IPlace> {
        try {
            const res = (await axios.post(`${this.getAdminEndpoint('places')}`, data, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            })).data;
            toast.success('Successfully created new place!');

            return res as IPlace;
        } catch (error) {
            let errorMsg = 'Something went wrong, please try again later';
            if (error instanceof AxiosError) {
                errorMsg = error.response?.data?.detail ?? error.message;
            }
            toast.error(errorMsg);
            throw error;
        }
    }

    async editPlace (token: string, placeId: number, data={}): Promise<IPlace> {
        try {
            const res = (await axios.put(`${this.getAdminEndpoint(`places/${placeId}`)}`, data, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            })).data;
            toast.success('Successfully edited place details!');

            return res as IPlace;
        } catch (error) {
            let errorMsg = 'Something went wrong, please try again later';
            if (error instanceof AxiosError) {
                errorMsg = error.response?.data?.detail ?? error.message;
            }
            toast.error(errorMsg);
            throw error;
        }
    }

    async deletePlace (token: string, placeId: number): Promise<IPlace> {
        try {
            const res = (await axios.delete(`${this.getAdminEndpoint(`places/${placeId}`)}`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            })).data;
            toast.success('Successfully deleted place!');

            return res as IPlace;
        } catch (error) {
            let errorMsg = 'Something went wrong, please try again later';
            if (error instanceof AxiosError) {
                errorMsg = error.response?.data?.detail ?? error.message;
            }
            toast.error(errorMsg);
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

    async approvePlace (
        token: string,
        placeId: number,
        data={},
    ) {
        try {
            const res = await makeAxiosPostRequest(
                `${this.getAdminEndpoint(`places/${placeId}/approve`)}`,
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

    async archivePlace (
        token: string,
        placeId: number,
        data={},
    ) {
        try {
            const res = await makeAxiosPostRequest(
                `${this.getAdminEndpoint(`places/${placeId}/archive`)}`,
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

    async getAllUsers (token?: string | null) {
        try {
            const res = await makeGetRequest(
                `${this.getAdminEndpoint('users')}`,
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