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

    // Show the overlay
    circularProgressContainer.style.display = "flex";

    const _description = form.description.value;
    const _rent = form.rent.value;
    const _address = form.address.value;
    const _images = form.image.files; // Assuming single image upload

    try {
        if(_images.length < 3){
            alert("Please upload at least 3 different images.");
            circularProgressContainer.style.display = "none";            
            return;
        }
        // You go do  Firebase Firestore data upload for here
        const docRef = await addDoc(collection(db, "properties"), {
            description: _description,
            rent: _rent,
            address: _address,
            imageUrls: [], // Initialize imageUrl as an empty string
        });

        // Come upload the images to Firebase Storage
        const _imageUrls = [];
        for (const _image of _images){
            const storageRef = ref(storage, `property_images/${_image.name}`);
    
            const snapshot = await uploadBytes(storageRef, _image);
              // You go come collet download URL of the first uploaded image
        const imageUrl = await getDownloadURL(storageRef);
        _imageUrls.push(imageUrl);

        }

      
        //then you go come  Update the Firestore document with the imageUrl
        await updateDoc(docRef, {
            imageUrls: _imageUrls,
        });


        // Display success messages

        const modal = document.getElementById("modal");
        const closeModalButton = document.getElementById("closeModal");
    
        // Close the modal when the "OK" button is clicked
        closeModalButton.onclick = () => {
            modal.style.display = "none";
            form.reset();
        };
    
        // Hide the overlay when the process is complete
        circularProgressContainer.style.display = "none";
        modal.style.display = "block";

        console.log("Document written with id: ", docRef.id);
        console.log("Image uploaded with download URLs: ", _imageUrls);

    } catch (error) {
        console.error("Omo Error o: ", error);
        alert("Property upload unsuccessful");

    }
});


