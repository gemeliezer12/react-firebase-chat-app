import { firebase } from "../../firebase"

const date = new Date()

const db = firebase.firestore()

const Index = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()

    const SignInWithGoogle = async () => {
        try {
            const res = await firebase.auth().signInWithPopup(googleProvider)

            try {
                const user = await db.collection("users").doc(res.user.uid).get()
                !user.exists && db.collection("users").doc(res.user.uid).set({
                    username: res.user.displayName,
                    dateCreated: date.getTime(),
                    profilePicture: res.user.photoURL,
                    joinedServer: [] 
                })
                
            }
            catch (err) {
                console.log(err);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="solid-btn red" onClick={() => SignInWithGoogle()}>
                <img src="images/gmail.png" alt="" />
                <p>Sign In with Gmail</p>
            </div>
        </div>
    )
}

export default Index
