import { toast } from "sonner";
import apiBaseUrl from "./config"

class AuthService {
    getAuthEndpoint(endpoint: string) {
        return `${apiBaseUrl}/auth/${endpoint}/`;
    }

    async registerUser (data={}) {
        try {
            const res = await fetch(`${this.getAuthEndpoint('register')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const jsonRes = await res.json();
            if (!res.ok) throw Error();

            toast.success('Successfully registered account!');

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async loginUser (data={}) {
        try {
            const res = await fetch(`${this.getAuthEndpoint('login')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const jsonRes = await res.json();
            if (!res.ok) throw Error();

            toast.success('Successfully logged in!');

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }
}

export {
    AuthService,
}