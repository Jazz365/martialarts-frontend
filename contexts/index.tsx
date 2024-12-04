import SearchFilterContextProvider from "./SearchFIlterContext";

const composeProviders = (...providers: ContextProvider[]): ContextProvider => {
    return ({ children }: ContextProviderProps) =>
        providers.reduceRight(
            (acc, Provider) => <Provider>{acc}</Provider>,
            children
        );
};

const AppProviders = composeProviders(
    SearchFilterContextProvider,
);

export default AppProviders;