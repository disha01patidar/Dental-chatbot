import { postRequest } from "./ApiRequest"
import { ENDPOINTS } from "./Endpoints"


export const LoginApiRequest = (payload: any) => {
    return postRequest(ENDPOINTS.LOGIN, payload)
}


export const getTokenApiRequest = () =>{
    return postRequest(ENDPOINTS.TOKEN)
}