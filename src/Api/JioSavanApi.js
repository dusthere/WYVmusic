import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const jioSavanApi = createApi({
    reducerPath:"jioSavanApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://jiosaavn-api.snehkr.in"
    }),
    endpoints:(builder) => ({
        searchSong : builder.query({
            query : (query) => `/search?query=${query}`,
        }),
        getSongById : builder.query({
            query : (id) => `/song?id=${id}`,
        }),
        getTrendingSong : builder.query({
            query : (lang) => `/trending?lang=${lang}`
        }),
        getTop10Songs : builder.query({
            query : (lang) => `/topalbum?lang=${lang}`
        }),
        getAlbumSongs : builder.query({
            query : (id) => `/album?id=${id}`
        }),
        getLyrics : builder.query({
            query : (id) => `/lyrics?id=${id}`
        })
    }),
})

export const {useSearchSongQuery ,
    useGetSongByIdQuery ,
    useGetTrendingSongQuery ,
    useGetTop10SongsQuery, 
    useGetAlbumSongsQuery,
    useGetLyricsQuery
    } = jioSavanApi;