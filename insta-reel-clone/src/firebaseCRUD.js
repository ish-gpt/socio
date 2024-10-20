// import { resolve } from 'npm-package-arg';
import { addDocsFirestore, firestoreCollection, dbInstance } from './firebase';
import { updateDoc, serverTimestamp, doc, getDoc, setDoc, collection, addDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export async function add(data, dbName, metaData) {
    try {
        let docRef = await setDoc(doc(dbInstance, "users", data.uid), {
            email: data.email,
            profileURL: metaData.downloadURL,
            uid: data.uid,
            createdAt: serverTimestamp(),
            fullName: metaData.fullName,
            postIds:[]
        });
        console.log("Document written in Db");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


export async function getUserData(user) {
    return new Promise(async (resolve, reject) => {
        try {
            const docRef = doc(dbInstance, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                 resolve(docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    })
}

export async function addPostsToDb(user, dbName, data) {
    try {
        const docRef = await addDoc(collection(dbInstance, dbName), {
            ...data,
            createdAt: serverTimestamp(),
        });
        const userDocRef = doc(dbInstance, 'users', user.uid);
        await updateDoc(userDocRef, {
            postIds: arrayUnion(docRef.id)
        });
        console.log("uploading posts to db successfull");
    } catch (error) {
        console.log("errro occured while uploading posts to db", error);
    }
}