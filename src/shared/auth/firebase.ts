import {
  FirebaseError,
  type FirebaseOptions,
  initializeApp
} from 'firebase/app'
import {
  type NextOrObserver,
  type User,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// ERROR MAP
export const FIREBASE_ERROR_MAP: Record<string, string> = {
  'auth/too-many-requests':
    'Too many login attempts. Please wait a moment before trying again.',
  'auth/user-not-found':
    'No account found with that username. Please check your credentials and try again.',
  'auth/internal-error':
    'An unexpected error occurred. Please refresh the page or try again shortly.',
  'auth/email-already-exists':
    'An account with this email already exists. Please use a different email or sign in.',
  'auth/invalid-credential':
    'Incorrect username or password. Please verify your information and try again.',
  default:
    'Something went wrong. Please try again or contact support if the issue persists.'
}

export const getFirebaseErrorMessage = (code: string) =>
  code in FIREBASE_ERROR_MAP
    ? FIREBASE_ERROR_MAP[code]
    : FIREBASE_ERROR_MAP.default

export type TSignInParams = {
  email: string
  password: string
  onError?: (reason: string) => void
}
export const signInUser = async ({
  email,
  password,
  onError
}: TSignInParams) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (e) {
    if (e instanceof FirebaseError && onError) {
      onError(getFirebaseErrorMessage(e.code))
    }
  }
}

export const userStateListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback)
}

export const signOutUser = async () => await signOut(auth)
