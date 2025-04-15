import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyBC7PJIvf91-1gm50treZdqRaLqcbSC7K4",
	authDomain: "review-selector.firebaseapp.com",
	projectId: "review-selector",
	storageBucket: "review-selector.firebasestorage.app",
	messagingSenderId: "536752495766",
	appId: "1:536752495766:web:0ff0bb0b8dd637921f36b7",
	measurementId: "G-2Y2WWMFBQ5"
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getReviewsByMonthYear(month, year) {
	const snapshot = await getDocs(collection(db, "staffReviews"));
	return snapshot.docs
	  .map(doc => ({ id: doc.id, ...doc.data() }))
	  .filter(doc => doc.month === month && doc.year === year);
}
