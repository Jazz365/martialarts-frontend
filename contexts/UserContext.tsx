'use client';
import useLoadData from "@/hooks/useLoadData";
import { UserService } from "@/services/userService";
import { AppConstants } from "@/utils/constants";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<UserContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    userDetails: null,
    setUserDetails: () => {},
    userDetailsLoading: true,
    setUserDetailsLoading: () => {},
    userSubscription: null,
    setUserSubscription: () => {},
    subscriptionDetailLoading: true,
    setSubscriptionDetailLoading: () => {},
    subscriptionDetailLoaded: false,
    setSubscriptionDetailLoaded: () => {},
});

export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({
    children
}: {
    children: React.ReactNode,
}) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
    const [ userDetails, setUserDetails ] = useState<IUser | null>(null);
    const [ userDetailsLoading, setUserDetailsLoading ] = useState<boolean>(true);

    const [ userSubscription, setUserSubscription ] = useState<ISubscription | null>(null);
    const [ subscriptionDetailLoading, setSubscriptionDetailLoading ] = useState(true);
    const [ subscriptionDetailLoaded, setSubscriptionDetailLoaded ] = useState(false);

    const userService = new UserService();

    useEffect(() => {
        const savedToken = AppConstants.savedToken;

        if (!savedToken) {
            setIsLoggedIn(false);
            setUserDetailsLoading(false)
            return;
        }
        
        if (userDetails) return setUserDetailsLoading(false);
        
        setUserDetailsLoading(true);
        
        userService.getUserDetail(savedToken).then(res => {
            setUserDetails(res);
            // setUserDetails({...res, is_owner: false, is_admin: true});
            setUserDetailsLoading(false);
            setIsLoggedIn(true);
        }).catch(() => {
            setUserDetailsLoading(false);
            setUserDetails(null);
        });
        
    }, [isLoggedIn, userDetails]);

    useLoadData(
        subscriptionDetailLoaded,
        setSubscriptionDetailLoading,
        userService.getOwnerProfile.bind(userService),
        setUserSubscription,
        setSubscriptionDetailLoaded,
        {
            authorisationRequired: true,
            hasDependency: true,
            dependency: userDetails && userDetails.is_owner === true,
        },
    );

    return <>
        <UserContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            userDetails,
            setUserDetails,
            userDetailsLoading,
            setUserDetailsLoading,
            userSubscription,
            setUserSubscription,
            subscriptionDetailLoading,
            setSubscriptionDetailLoading,
            subscriptionDetailLoaded,
            setSubscriptionDetailLoaded,
        }}>
            {children}
        </UserContext.Provider>
    </>
}

export default UserContextProvider;