import { generateDashLinkForUser } from "@/helpers/helpers";
import { IconType } from "react-icons";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoCalendarOutline, IoHomeOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
// import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";

export interface LinkItemDetail {
    id: number;
    icon: IconType;
    text: string;
    location: string;
}

export const ownerNavLinks: LinkItemDetail[] = [
    {
        id: 1,
        location: generateDashLinkForUser({ isOwner: true }),
        icon: IoHomeOutline,
        text: 'dashboard',
    },
    {
        id: 2,
        location: `${generateDashLinkForUser({ isOwner: true })}/studios`,
        icon: HiOutlineBuildingOffice2,
        text: 'studios',
    },
    {
        id: 3,
        location: `${generateDashLinkForUser({ isOwner: true })}/bookings`,
        icon: IoCalendarOutline,
        text: 'students',
    },
    {
        id: 4,
        location: `${generateDashLinkForUser({ isOwner: true })}/subscription`,
        icon: MdOutlinePayment,
        text: 'subscription',
    },
]

export const userNavLinks: LinkItemDetail[] = [
    {
        id: 1,
        location: generateDashLinkForUser(),
        icon: IoHomeOutline,
        text: 'dashboard',
    },
    {
        id: 2,
        location: `${generateDashLinkForUser()}/bookings`,
        icon: IoCalendarOutline,
        text: 'classes',
    },
    {
        id: 3,
        location: `${generateDashLinkForUser()}/saved-studios`,
        icon: HiOutlineBuildingOffice2,
        text: 'saved studios',
    },
]


export const adminNavLinks: LinkItemDetail[] = [
    {
        id: 1,
        location: generateDashLinkForUser({ isAdmin: true }),
        icon: IoHomeOutline,
        text: 'dashboard',
    },
    {
        id: 2,
        location: `${generateDashLinkForUser({ isAdmin: true })}/studios`,
        icon: HiOutlineBuildingOffice2,
        text: 'studios',
    },
    {
        id: 3,
        location: `${generateDashLinkForUser({ isAdmin: true })}/all-users`,
        icon: FaUsers,
        text: 'users',
    },
    {
        id: 4,
        location: `${generateDashLinkForUser({ isAdmin: true })}/bookings`,
        icon: IoCalendarOutline,
        text: 'bookings',
    },
    // {
    //     id: 5,
    //     location: `${generateDashLinkForUser({ isAdmin: true })}/reports`,
    //     icon: TbBrandGoogleAnalytics,
    //     text: 'reports',
    // }
]