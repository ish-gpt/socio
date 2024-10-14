import { addDocsFirestore, firestoreCollection, dbInstance } from './firebase';
import { updateDoc, serverTimestamp } from "firebase/firestore";

export async function add(data, dbName, metaData) {
    try {
        const docRef = await addDocsFirestore(firestoreCollection(dbInstance, dbName), {
            email: data.email,
            profileURL: metaData.downloadURL,
            uid: data.uid,
            createdAt: serverTimestamp(),
            fullName: metaData.fullName
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}