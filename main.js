import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-analytics.js';
import { getFirestore, collection, addDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAGYKDdjNjVe13M6JUGmRNVe6PEdV8QpJY",
    authDomain: "quatr-69067.firebaseapp.com",
    projectId: "quatr-69067",
    storageBucket: "quatr-69067.appspot.com",
    messagingSenderId: "658664071138",
    appId: "1:658664071138:web:f2eaa639b422ca087b23bb"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Get  reference to the form
const form = document.getElementById("propertyForm");

// Add event listener for the form submission

form.addEventListener("submit", async (e) => { // Make the event listener asynchronous
    e.preventDefault();
    const _description = form.description.value;
    const _rent = form.rent.value;
    const _address = form.address.value;
    const _image = form.image.files[0]; // Assuming single image upload

    try {
        // Ypu go do  Firebase Firestore data upload for here
        const docRef = await addDoc(collection(db, "properties"), {
            description: _description,
            rent: _rent,
            address: _address,
            imageUrl: "", // Initialize imageUrl as an empty string
        });

        // Come upload the image to Firebase Storage
        const storageRef = ref(storage, `property_images/${_image.name}`);
        const snapshot = await uploadBytes(storageRef, _image);

        // You go come collet download URL of the uploaded image
        const imageUrl = await getDownloadURL(storageRef);

        //then you go come  Update the Firestore document with the imageUrl
        await updateDoc(docRef, {
            imageUrl: imageUrl,
        });

        // Display success messages
        alert("Document written with id: " + docRef.id);
        alert("Image uploaded with download URL: " + imageUrl);

        console.log("Document written with id: ", docRef.id);
        console.log("Image uploaded with download URL: ", imageUrl);
    } catch (error) {
        console.error("Omo Error o: ", error);
    }
});


