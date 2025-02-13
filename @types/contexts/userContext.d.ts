type UserContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (val: boolean) => void;
    userDetails: IUser | null;
    setUserDetails: (user: IUser | null) => void;
    userDetailsLoading: boolean;
    setUserDetailsLoading: (val: boolean) => void;
    userSubscription: ISubscription | null;
    setUserSubscription: (val: ISubscription | null) => void;
    subscriptionDetailLoading: boolean;
    setSubscriptionDetailLoading: (val: boolean) => void;
    subscriptionDetailLoaded: boolean;
    setSubscriptionDetailLoaded: (val: boolean) => void;

}