
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { updateProfile } from "firebase/auth";
import { CleaningServices } from "@mui/icons-material";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async ()=> {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user
        
        return {
            ok: true,
            //user info
            displayName, email, photoURL, uid
        }
       
    } catch (error) {
         const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)

        return {
            ok:false,
        }
    }
}

export const registerWithEmailPassword = async ({email, password, displayName}) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        console.log(resp);
        const { uid, photoURL } = resp.user;
      
        updateProfile(FirebaseAuth.currentUser, {displayName})

        return {
            ok: true, 
            uid, photoURL, email, displayName
        }
    } catch (error) {
        console.log(error)
        return{ok:false, errorMessage:error.message}
    }
}

export const loginWithEmailPassword = async({email, password}) => {
    try {
        
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        console.log(error.message)
        return{ok:false, errorMessage:error.message}
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}