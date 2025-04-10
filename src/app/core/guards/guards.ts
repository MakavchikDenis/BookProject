import { inject } from "@angular/core"
import { UserStateService } from "../services/user-state.service"

export const isloggedIn=()=>{
    const userState = inject(UserStateService);
    return userState.isLoggedIn();
}