import { IAuthState}

const selectAuthErrorList = (state) => state.errorsList;
const selectCurrentUser = (state) => state.currentUser;
const selectFetchingStatus = (state) => state.isFetching;

 () => {
    

    // eslint-disable-next-line one-var
    var queryFetchingObservable = createSelector(selectFetchingStatus,
            (isFetch) => isFetch.inProgress ?
                isFetch.payload.observable :
                undefined)
        , queryFirstError = createSelector(selectAuthErrorList,
            (list) => `Error code: ${list[0].firebaseError.code}. Message: ${list[0].firebaseError.message}`) // eslint-disable-line no-magic-numbers
        , queryIsAuthenticated = createSelector(selectCurrentUser, (user) => user !== null)
        , queryIsCurrentFaulted = createSelector(selectAuthErrorList, (list) => list.length > 0) // eslint-disable-line no-magic-numbers
        , queryIsFetchInProgress = createSelector(selectFetchingStatus, (status) => status.inProgress)
        , queryIsLoginFetchInProgress = createSelector(selectFetchingStatus,
            (isFetch) => isFetch.inProgress ?
                isFetch.payload.kind === 'login' :
                false)
        , queryIsLogoutFetchInProgress = createSelector(selectFetchingStatus,
            (isFetch) => isFetch.inProgress ?
                isFetch.payload.kind === 'logout' :
                false)
        , queryLoginStage = createSelector(queryIsAuthenticated,
            queryIsLoginFetchInProgress,
            queryIsLogoutFetchInProgress,
            queryIsCurrentFaulted,
            (auth: boolean, login: boolean, logout: boolean, error: boolean) => {
                if (auth) {
                    return 'authenticated';
                }
                if (login) {
                    return 'fetching-login';
                }
                if (logout) {
                    return 'fetching-logout';
                }
                if (error) {
                    return 'faulted';
                }
                return 'anonymous';
            });
    return {
        queryFetchingObservable
        , queryFirstError
        , queryIsAuthenticated
        , queryIsCurrentFaulted
        , queryIsFetchInProgress
        , queryIsLoginFetchInProgress
        , queryIsLogoutFetchInProgress
        , queryLoginStage
        , selectAuthErrorList
        , selectCurrentUser
        , selectFetchingStatus
    };
};