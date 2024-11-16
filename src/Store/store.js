import {configureStore} from '@reduxjs/toolkit';
import {shazamCoreApi} from '../Api/api'
import {jioSavanApi} from '../Api/JioSavanApi'
// import songReducer from './SongSlice'

export const store = configureStore({
    reducer:{
        [shazamCoreApi.reducerPath] : shazamCoreApi.reducer,
        [jioSavanApi.reducerPath] : jioSavanApi.reducer,
        // song : songReducer
    },
    middleware : (getDefaultMiddleWare) => 
        getDefaultMiddleWare().concat(
            shazamCoreApi.middleware,
            jioSavanApi.middleware
        ),
})