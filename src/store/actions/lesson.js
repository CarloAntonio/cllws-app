import * as actionTypes from "../actionTypes";

import { handleResponseErrors, handleJsonErrors } from './utils';

export const getAccessableLessons = (token, subjectName) => {
    return async dispatch => {
        try {
            const response = await fetch('http://localhost:8080/lesson/' + subjectName, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })

            const jsonData = await handleResponseErrors(response);
            if(jsonData instanceof Error) throw jsonData;

            const result = await handleJsonErrors(jsonData);
            if(result instanceof Error) throw result;
            else return result;

        } catch(err){
            return err;
        }
    }
}

// export const getPostsPublic = (token, username) => {
//     return async dispatch => {
//         try {
//             const response = await fetch('http://localhost:8080/post/getPosts/' + username, {
//                 headers: {
//                     Authorization: 'Bearer ' + token,
//                 },
//             })

//             const jsonData = await handleResponseErrors(response);
//             if(jsonData instanceof Error) throw jsonData;

//             const result = await handleJsonErrors(jsonData);
//             if(result instanceof Error) throw result;
//             else return result;

//         } catch(err){
//             return err;
//         }
//     }
// }

// export const getFeed = (token, friends) => {

//     const queryString = encodeURIComponent(JSON.stringify(friends))

//     return async dispatch => {
//         try {
//             const response = await fetch('http://localhost:8080/feed/getFeed/' + queryString, {
//                 headers: {
//                     Authorization: 'Bearer ' + token,
//                 },
//             })

//             const jsonData = await handleResponseErrors(response);
//             if(jsonData instanceof Error) throw jsonData;

//             const result = await handleJsonErrors(jsonData);
//             if(result instanceof Error) throw result;
//             else return result;

//         } catch(err){
//             return err;
//         }
//     }
// }
