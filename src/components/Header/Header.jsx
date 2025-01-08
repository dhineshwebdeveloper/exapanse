import React, { useEffect } from 'react'
import './styles.css'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signOut } from "firebase/auth";
import userImg from "../../assets/img/user.png"
const Header = () => {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, loading])

  function LogoutFnc() {
    try {
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success('Looged out successfully')
        navigate('/')
      }).catch((error) => {
        // An error happened.
        toast.error(error.message)
      });

    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <div className='navbar'>
      <p className='logo'>Financely</p>
      {user &&
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img src={user.photoURL ? user.photoURL : userImg} alt="userimg"

            style={{ borderRadius: "50%", height: "3rem", width: "3rem" }}
          />
         
          <button class="Btn1" onClick={LogoutFnc}>
            <div class="sign">
              <svg viewBox="0 0 512 512">
                <path
                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                ></path>
              </svg>
            </div>

            <div class="text">Logout</div>
          </button>

        </div>

      }
    </div>
  )
}

export default Header
