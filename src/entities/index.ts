import * as building from "./building"
import * as dept from "./dept"
import * as pub from "./pub"
import * as user from "./user"


export default {
    ...building,
    ...dept,
    ...pub,
    ...user
}