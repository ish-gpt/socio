import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { add, addPostsToDb } from "./firebaseCRUD";
const { v4: uuidv4 } = require('uuid');

export async function uploadUserProfile(user,file, userName) {

    const storage = getStorage();
    const storageRef = ref(storage, `/users/${user.uid}/ProfileImage`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            console.log('Error Uploading Profile Picture', error);
            throw new Error('Error Uploading Profile Picture');
        },
        async () => {
            let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            let data = {
                downloadURL: downloadURL,
                fullName: userName
            }
            await add(user, "users", data)
        }
    );
}



export async function uploadUserPosts(user, file) {
    return new Promise((resolve,reject) => {

        const storage = getStorage();
        const uid = uuidv4();
        const storageRef = ref(storage, `/posts/${uid}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Post Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log('Error Uploading Post', error);
                reject(new Error('Error Uploading Post'));
            },
            async () => {
                let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                let data = {
                    likes: [],
                    comments: [],
                    pId: uid,
                    pURL: downloadURL,
                    userID: user.uid,
                    userProfile: user.profileURL,
                    uName: user.fullName
                }
                await addPostsToDb(user, "posts", data)
                resolve();
            }
        );
    })
}
