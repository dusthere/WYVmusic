import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const shazamCoreApi = createApi({
    reducerPath:"shazamCoreApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://shazam-api7.p.rapidapi.com",
        prepareHeaders : (headers)=>{
            headers.set('x-rapidapi-key' , import.meta.env.VITE_RAPID_API_KEY);
            headers.set('x-rapidapi-host', 'shazam-api7.p.rapidapi.com');
            return headers;
        },
    }),
    endpoints : (builder) => ({
        getTopSongsInWorld:builder.query({
            query: () => '/charts/get-top-songs-in-world'
        })
    })
});

export const {useGetTopSongsInWorldQuery} = shazamCoreApi;
