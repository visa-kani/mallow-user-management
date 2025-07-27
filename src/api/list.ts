import { getAPI } from "./action"
import URLConstant from "./urls"

export const getUser = (params?: any) => {
    return getAPI(URLConstant.users, params);
}