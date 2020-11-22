import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCUGvNraJB3hYoAU3DptO1jEoOJm7d6_A8',
  authDomain: 'casamento-98174.firebaseapp.com',
  projectId: 'casamento-98174'
})

export const db = firebase.firestore()
