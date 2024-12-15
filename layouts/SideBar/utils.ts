import { generateDashLinkForUser } from "@/helpers/helpers";
import { IconType } from "react-icons";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoCalendarOutline, IoHomeOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";

export interface LinkItemDetail {
    id: number;
    icon: IconType;
    text: string;
    location: string;
}

export const ownerNavLinks: LinkItemDetail[] = [
    {
        id: 1,
        location: generateDashLinkForUser(true),
        icon: IoHomeOutline,
        text: 'dashboard',
    },
    {
        id: 2,
        location: `${generateDashLinkForUser(true)}/places`,
        icon: HiOutlineBuildingOffice2,
        text: 'places',
    },
    {
        id: 3,
        location: `${generateDashLinkForUser(true)}/bookings`,
        icon: IoCalendarOutline,
        text: 'bookings',
    },
    {
        id: 4,
        location: `${generateDashLinkForUser(true)}/subscription`,
        icon: MdOutlinePayment,
        text: 'subscription',
    },
]