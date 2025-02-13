import axios, { AxiosError } from "axios";
import apiBaseUrl from "./config"
import { toast } from "sonner";
import { makeGetRequest } from "./functions";

class UserService {
    getUserEndpoint(endpoint: string) {
        return `${apiBaseUrl}/users/${endpoint}/`;
    }

    async getUserDetail (token: string) {
        try {
            const res = await fetch(`${this.getUserEndpoint('details')}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
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

    async initiateSubscription (token: string) {
        try {
            const res = await axios.post(
                `${this.getUserEndpoint('subscription/create')}`, 
                {}, 
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                },
            );
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.info(error.response?.data?.detail ?? error.message);
            } else {
                toast.error('Something went wrong while trying to initiate a new subscription, please try again later');
            }
            
            throw error;
        }
    }

    async activateSubscription (token: string) {
        try {
            const res = await axios.post(
                `${this.getUserEndpoint('subscription/activate')}`, 
                {}, 
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                },
            );
            return res;
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.info(error.response?.data?.detail ?? error.message);
            } else {
                toast.error('Something went wrong while trying to confirm your new subscription, please contact support');
            }
            
            throw error;
        }
    }

    async getOwnerProfile (token?: string | null) {
        try {
            const res = await makeGetRequest(
                `${this.getUserEndpoint('owner-profile')}`,
                {
                    'Authorization': `Token ${token}`,
                }
            );
            return res
        } catch (error) {
            
        }
    }
}

export {
    UserService,
}