import { toast } from "sonner";
import apiBaseUrl from "./config"
import axios from "axios";

class PlaceService {
    private getPlaceEndpoint(endpoint: string, searchParams?: string | null | undefined) {
        return `${apiBaseUrl}/places/${endpoint.length < 1 ? '' : endpoint + '/'}${searchParams ?? ''}`;
    }

    async createNewPlace (token: string, data={}): Promise<IPlace> {
        try {
            const res = (await axios.post(`${this.getPlaceEndpoint('create')}`, data, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            })).data;
            
            toast.success('Successfully created new place!');

            return res as IPlace;
        } catch (error) {
            toast.error('Something went wrong, please try again later');
            
            throw error;
        }
    }

    async getAllPlaces () {
        try {
            const res = await fetch(`${this.getPlaceEndpoint('')}`, {
                method: 'GET',
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = 'Something went wrong. Please try again later';
                throw Error(errorMsg);
            }

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async getSinglePlace (placeId: number) {
        try {
            const res = await fetch(`${this.getPlaceEndpoint(`${placeId}`)}`, {
                method: 'GET',
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = 'Something went wrong. Please try again later';
                throw Error(errorMsg);
            }

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async getUserPlaces (token?: string | null) {
        try {
            const res = await fetch(`${this.getPlaceEndpoint('my-places')}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = 'Something went wrong. Please try again later';
                throw Error(errorMsg);
            }

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async getAllStyles () {
        try {
            const res = await fetch(`${this.getPlaceEndpoint('styles')}`, {
                method: 'GET',
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = 'Something went wrong. Please try again later';
                throw Error(errorMsg);
            }

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async createNewStyle (token: string, data={}): Promise<IMartialArtStyle> {
        try {
            const res = (await axios.post(`${this.getPlaceEndpoint('styles/create')}`, data, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            })).data;

            return res as IMartialArtStyle;
        } catch (error) {
            toast.error('Something went wrong, please try again later');
            
            throw error;
        }
    }

    async getAllPlaceTypes () {
        try {
            const res = await fetch(`${this.getPlaceEndpoint('place-types')}`, {
                method: 'GET',
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = 'Something went wrong. Please try again later';
                throw Error(errorMsg);
            }

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async getAllCatersTo () {
        try {
            const res = await fetch(`${this.getPlaceEndpoint('caters-to')}`, {
                method: 'GET',
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = 'Something went wrong. Please try again later';
                throw Error(errorMsg);
            }

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async searchPlace (queryParams?: string | undefined | null) {
        try {
            const res = await fetch(`${this.getPlaceEndpoint('', queryParams)}`, {
                method: 'GET',
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = 'Something went wrong. Please try again later';
                throw Error(errorMsg);
            }

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async getPlaceViewStats (token?: string | null) {
        try {
            const res = await fetch(`${this.getPlaceEndpoint('views-stats')}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                }
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = 'Something went wrong. Please try again later';
                throw Error(errorMsg);
            }

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }
}

export {
    PlaceService,
}