type IUser = {
    id: number;
    email: string;
    is_owner: boolean;
    is_admin?: boolean;
    phone_number: string | null;
    username: string;
    name?: string;
}