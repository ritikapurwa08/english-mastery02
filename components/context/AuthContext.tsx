"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AppUser extends User {
  avatarUrl?: string; // Links to public/avatar_images/
  xp?: number;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: { displayName?: string; avatarUrl?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signUp: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  updateUserProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Fetch additional profile data from Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({ ...firebaseUser, ...userData } as AppUser);
          } else {
            setUser(firebaseUser as AppUser);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Fallback: still log the user in, just without extra profile data
        if (firebaseUser) {
          setUser(firebaseUser as AppUser);
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user document in Firestore with empty profile fields for now
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: "",
      photoURL: "",
      avatarUrl: "",
      xp: 0,
      createdAt: new Date().toISOString()
    });
  };

  const loginWithGoogle = async () => {
     const provider = new GoogleAuthProvider();
     const result = await signInWithPopup(auth, provider);
     const user = result.user;

     // Check if user doc exists, if not create it
     const userRef = doc(db, "users", user.uid);
     const docSnap = await getDoc(userRef);

     if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          avatarUrl: user.photoURL || "",
          xp: 0,
          createdAt: new Date().toISOString()
        });
     }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserProfile = async (data: { displayName?: string; avatarUrl?: string }) => {
    if (!auth.currentUser) throw new Error("No user logged in");

    const { displayName, avatarUrl } = data;
    const updates: any = {};

    // 1. Update Firebase Auth Profile (only supports displayName and photoURL)
    // We'll use photoURL to store the avatarUrl if it's a URL, or leave it if we are using internal avatar paths
    // But for consistency with our AppUser type, let's update Auth profile
    if (displayName) updates.displayName = displayName;
    if (avatarUrl) updates.photoURL = avatarUrl; // Assuming avatarUrl can be put in photoURL

    // Update Auth Profile
    // Note: importing updateProfile from firebase/auth needed
    if (Object.keys(updates).length > 0) {
        await updateProfile(auth.currentUser, updates);
    }

    // 2. Update Firestore User Document
    const firestoreUpdates: any = {};
    if (displayName) firestoreUpdates.displayName = displayName;
    if (avatarUrl) firestoreUpdates.avatarUrl = avatarUrl;
    // Sync photoURL in Firestore as well for consistency
    if (avatarUrl) firestoreUpdates.photoURL = avatarUrl;

    if (Object.keys(firestoreUpdates).length > 0) {
        await setDoc(doc(db, "users", auth.currentUser.uid), firestoreUpdates, { merge: true });
    }

    // 3. Update Local State
    setUser((prev) => prev ? ({ ...prev, ...firestoreUpdates }) : null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, loginWithGoogle, logout, updateUserProfile }}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
