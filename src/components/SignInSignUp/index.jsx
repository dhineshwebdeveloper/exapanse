import React, { useState } from 'react';
import './styles.css';
import Input from '../inputs';
import Button from '../Button/index';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider

} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db, provider } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const SignupSigninComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signUpWithEmail = async () => {
    setLoading(true);

    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          toast.success('User created successfully');
          setLoading(false);

          // Clear input fields
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');

          // Create user document in Firestore
          await createDoc(user);

          // Redirect to dashboard
          navigate('/dashboard');
        } catch (error) {
          toast.error(error.message);
          setLoading(false);
        }
      } else {
        toast.error("Passwords don't match!");
        setLoading(false);
      }
    } else {
      toast.error('All fields are mandatory');
      setLoading(false);
    }
  };

  const loginWithEmail = async () => {
    setLoading(true)
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        toast.success('User logged in successfully');
        setLoading(false);
        navigate('/dashboard');
      } catch (error) {
        toast.error(error.message);
        setLoading(false)
      }
    } else {
      toast.error('All fields are mandatory');
      setLoading(false)

    }
  };

  const createDoc = async (user) => {
    setLoading(true)
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid); // Firestore reference
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          name: name || 'Anonymous',
          email: user.email,
          photoURL: user.photoUrl || '',
          createdAt: new Date(),
        });
        toast.success('Document created successfully');
        setLoading(false)

      } else {
        // toast.error('Document already exists');
        setLoading(false)

      }
    } catch (error) {
      console.error('Error creating document:', error);
      toast.error(`Error: ${error.message}`);
      toast.error('Document already exists');
      setLoading(false)

    }
  };

  const googleAuth = async () => {
    setLoading(true);

    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info
      const user = result.user;
      console.log('User>>>', user);
      createDoc(user)
      setLoading(false)
      navigate('/dashboard');
      toast.success('User logged in successfully');

      // Additional user info if needed
      // const additionalUserInfo = getAdditionalUserInfo(result);
    } catch (error) {
      setLoading(false)
      // Handle errors
      const errorMessage = error.message;
      console.error('Error during Google Auth:', errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      {loginForm ? (
        <>
          <div className="title-section">
            <h2>
              Sign Up on <span>Financely.</span>
            </h2>
          </div>
          <div className="form-section">
            <form>
              <Input type="email" label="Email" state={email} setState={setEmail} placeholder="JohnDoe@gmail.com" />
              <Input type="password" label="Password" state={password} setState={setPassword} placeholder="example@123" />
              <Button disabled={loading} text={loading ? 'Loading...' : 'Login'} onClick={loginWithEmail} />
              <p className="p-login">or</p>
              <Button
                onClick={googleAuth}
                text={loading ? 'Loading...' : 'Login with Google'} blue />
              <p className="p-login" style={{ cursor: 'pointer' }} onClick={() => setLoginForm(false)}>
                Don't have an account? Click here
              </p>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="title-section">
            <h2>
              Sign Up on <span>Financely.</span>
            </h2>
          </div>

          <div className="form-section">
            <form>
            <Input type="text" label="Full Name" state={name} setState={setName} placeholder="John Doe" />
            <Input type="email" label="Email" state={email} setState={setEmail} placeholder="JohnDoe@gmail.com" />
            <Input type="password" label="Password" state={password} setState={setPassword} placeholder="example@123" />
            <Input
              type="password"
              label="Confirm Password"
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder="example@123"
            />
            <Button disabled={loading} text={loading ? 'Loading...' : 'Sign Up'} onClick={signUpWithEmail} />
            <p className="p-login">or</p>
            <Button
              onClick={googleAuth}
              text={loading ? 'Loading...' : 'Sign Up with Google'} blue />
            <p className="p-login" style={{ cursor: 'pointer' }} onClick={() => setLoginForm(true)}>
              Already have an account? Click here
            </p>
          </form>
          </div>
        </>
      )}
    </div>
  );
};

export default SignupSigninComponent;
