export interface BookingDetails {
    place_id: number;
    date: string;
    time: string;
    name: string;
    phone?: string;
    email: string;
    is_for_child: boolean | null;
    child_name?: string;
    child_dob?: string;
    child_phone_number?: string;
    child_email?: string;
    selected_styles: number[];
    agreed_to_health_declaration: boolean;
    agreed_to_liability_waiver: boolean;
}

export const initialBookingDetails: BookingDetails = {
    place_id: 0,
    date: '',
    time: '09:00',
    name: '',
    phone: '',
    email: '',
    is_for_child: null,
    selected_styles: [],
    agreed_to_health_declaration: false,
    agreed_to_liability_waiver: false,
}

export const bookingDetailsDict = {
    place_id: 'place_id',
    date: 'date',
    time: 'time',
    name: 'name',
    phone: 'phone',
    email: 'email',
    is_for_child: 'is_for_child',
    child_name: 'child_name',
    child_dob: 'child_dob',
    child_phone_number: 'child_phone_number',
    child_email: 'child_email',
    selected_styles: 'selected_styles',
    agreed_to_health_declaration: 'agreed_to_health_declaration',
    agreed_to_liability_waiver: 'agreed_to_liability_waiver',
}

export const formPageDetail = [
    {
        id: 1,
        name: 'details',
    },
    {
        id: 2,
        name: 'personal information',
    },
    {
        id: 3,
        name: 'confirmation',
    },
]

export const requiredInfo: {
    [ key: number ]:  string[]
} = {
    2: [
        bookingDetailsDict.name,
        bookingDetailsDict.email,
        bookingDetailsDict.selected_styles,
    ],
    3: [
        bookingDetailsDict.date,
        bookingDetailsDict.time,
    ],
}

export const bookingUserOptions = [
    {
        id: 1,
        name: 'an adult',
        value: false,
    },
    {
        id: 2,
        name: 'a parent',
        value: true,
    }
]