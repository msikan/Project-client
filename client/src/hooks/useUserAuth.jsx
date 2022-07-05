import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation  } from "react-router-dom";

import { getUserInfo } from '../api/auth';

import { setUser } from '../store/appSlice';

const useUserAuth = () => {
    const [loading,setLoading] = useState(false);
    const [isAuth,setIsAuth] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const { pathname } = location;


    useEffect(() => {
        console.log(pathname);
        if (!isAuth && !['/login','/register'].includes(pathname)) {
            init();
        }
    },[pathname,isAuth]);


    const init  = async() => {
        setLoading(true);
        const { data } = await getUserInfo() || {};
        if (data?.success) {
            setIsAuth(true);
            dispatch(setUser({ ...(data?.data || {}) }));
        } else {
            navigate('/login');
        }
        setLoading(false);
    }


    const getUserInfoApi = async() => {
        const { data } = await getUserInfo() || {};
        if (data?.success) {
            //setIsAuth(true);
            dispatch(setUser({ ...(data?.data || {}), coins: (data?.data?.coins || 0) }));
        }
    }




    return {
        loading,
        getUserInfoApi
    }
}



export default useUserAuth;