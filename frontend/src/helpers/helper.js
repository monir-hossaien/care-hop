// success toast
import toast from "react-hot-toast";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import cookies from "js-cookie";

class ValidationHelper{

    static IsLater(value) {
        let  OnlyLaterRegx =/^[A-Za-z\'\s\.\,\-\!\@\#\$\%\^\&\*\(\)\[\]\{\}\:\;\"\<\>\?\/\+\=\_\\\|`\~]+$/
        return OnlyLaterRegx.test(value);
    }
    static IsEmail(value) {
        let EmailRegx = /\S+@\S+\.\S+/;
        return EmailRegx.test(value);
    }
    static IsMobile(value) {
        let  MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
        return MobileRegx.test(value);
    }
    static IsNumber(value) {
        let  OnlyNumberRegx = /^\d+(\.\d+)?$/;
        return OnlyNumberRegx.test(value);
    }
    static IsNull(value) {
        return value == null;
    }
    static  IsEmpty(value) {
        return value.length === 0;
    }
}
export default ValidationHelper

export const successToast = (message) => {
    toast.success(message);
}

// error toast
export const errorToast = (message) => {
    toast.error(message);
}

export  const  TimestampToDate =(timestamp)=> {
    let date = new Date(timestamp);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return date.getDate() + " " + monthNames[date.getMonth()] + ", " + date.getFullYear();
}

export const ScrollToTopOnNavigation = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
};

export const unauthorized =(code)=>{
    if(code === 401){
        cookies.remove("token");
        window.location.href="/login"
    }
}

