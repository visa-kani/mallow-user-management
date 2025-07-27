import { putAPI } from "./action"
import URLConstant from "./urls"

export const updateUser = (values?: any, id?: any) => {
    return putAPI(URLConstant.users, id, values);
}