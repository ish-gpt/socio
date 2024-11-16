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

export async function addCommentToDb(commentData, dbName, postId) {
    try {
        const docRef = await addDoc(collection(dbInstance, dbName), {
            ...commentData
        });
        const postDocRef = doc(dbInstance, 'posts', postId);
        await updateDoc(postDocRef, {
            comments: arrayUnion(docRef.id)
        });
        console.log("comments saved to db successfull");
    } catch(error) {
        console.log("error occured while saving comment to db", error);
    }
}

export async function getCommentsFromDb(commentId) {
    try {
        const docRef = doc(dbInstance, 'comments', commentId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            // console.log("---", docSnap.id)
            return { ...docSnap.data(), commentId:docSnap.id};
        } else {
            console.log("No such document!");
            throw "Error fetching comments"
        }
    } catch (error) {
        console.log("Error",error);
    }
}

export async function updateCommentData(commentData, isLiked, userDetails) {
    try {
        const commentRef = doc(dbInstance, 'comments', commentData.commentId);
        const docSnap = await getDoc(commentRef);
        let data = await Promise.all([docSnap.data()]);
        let likesArr = []
        if (!isLiked) {
            likesArr = [...data[0].likedBy, userDetails.uid];            
        } else {
            likesArr = data[0].likedBy.filter((likeID) => {
                return likeID != userDetails.uid
            });
        }
        await updateDoc(commentRef, {
            likedBy: likesArr
        });
        console.log('comments updated successful');
    } catch (error) {
        console.log("Error", error);
    }
}


export async function isCommentLikedByUser(commentData, userDetails) {
    const commentRef = doc(dbInstance, 'comments', commentData.commentId);
    const docSnap = await getDoc(commentRef);
    let data = await Promise.all([docSnap.data()]);
    return data[0].likedBy.includes(userDetails.uid);
}