import { toast } from "sonner";
import apiBaseUrl from "./config"
import axios from "axios";

class BookingService {
    private getBookingEndpoint(endpoint: string) {
        return `${apiBaseUrl}/bookings/${endpoint.length < 1 ? '' : endpoint + '/'}`;
    }

    async createNewBooking (token: string, data={}) {
        try {
            const res = (await axios.post(`${this.getBookingEndpoint('create')}`, data, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            })).data;
            
            toast.success('Successfully created new booking!');

            return res as IBooking;
        } catch (error) {
            toast.error('Something went wrong, please try again later');
            
            throw error;
        }
    }

    async getOwnerBookings (token?: string | null) {
        try {
            const res = await fetch(`${this.getBookingEndpoint('owner-bookings')}`, {
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

    async getUserBookings (token?: string | null) {
        try {
            const res = await fetch(`${this.getBookingEndpoint('user-bookings')}`, {
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

    async cancelBooking (token: string, bookingId: number, data={}) {
        try {
            const res = (await axios.post(`${this.getBookingEndpoint(bookingId + '/' + 'cancel')}`, data, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            })).data;
            
            toast.success('Successfully updated canceled booking!');

            return res as IBooking;
        } catch (error) {
            toast.error('Something went wrong, please try again later');
            
            throw error;
        }
    }

    async manageBookingStatus (token: string, bookingId: number, data={}) {
        try {
            const res = (await axios.patch(`${this.getBookingEndpoint(bookingId + '/' + 'owner-manage')}`, data, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            })).data;
            
            toast.success('Successfully updated status for booking!');

            return res as IBooking;
        } catch (error) {
            toast.error('Something went wrong, please try again later');
            
            throw error;
        }
    }
}

export {
    BookingService,
}