import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../../hooks/checkAuth';
import { notification } from 'antd';

const index = () => {
    const [user_name, setUsername] = useState("");
    const [user_email, setEmail] = useState("");
    const [user_role, setRole] = useState("");
    const [user_password, setPassword] = useState("");

    let loginURL = "http://localhost:7007/auth/create";

    let navigate = useNavigate();

    useEffect(() => {
        const auth_token = checkAuth();
        if (auth_token) {
            notification.success({
                message: "Success Login"
            })
            return setTimeout(() => {
                navigate("/admin")
            }, 2000);
        }
    }, [navigate]);

    const auth = (e) => {

        e.preventDefault();

        const submitForm = {
            user_name,
            user_email,
            user_role,
            user_password
        };

        const check = {
            user_name: user_name.trim().length === 0,
            user_email: user_email.trim().length === 0,
            user_role: user_role.trim().length === 0,
            user_password: user_password.trim().length === 0
        }

        if (check.user_name || check.user_email || check.user_role || check.user_password) {
            toast("Please fill the form", { type: "error", autoClose: 1500 });
        } else {
            fetch(`${loginURL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(submitForm)
            }).then((response) => response.json())
                .then((result) => {
                    if (result.msg === "Admin not found") {
                        return toast("Admin info error", {
                            type: "info",
                            autoClose: 1500
                        })
                    } else if (result.msg === 'Password incorrect') {
                        return toast("Admin password error", {
                            type: "error",
                            autoClose: 1500
                        })
                    }
                    localStorage.setItem("token", result.token);
                    navigate("/admin");
                })
                .catch((err) => {
                    toast.error("error authen", {
                        autoClose: 1500
                    })
                })
            setUsername("");
            setEmail("");
            setRole("");
            setPassword("");
        }
    }


    return (
        <>
            <div className="login card bg-light shadow-lg p-4 mt-5 mx-auto w-50">
                <h1 className='text-center'>Login Page</h1>

                <form action="#" onSubmit={(e) => auth(e)}>

                    <label htmlFor="username" className='w-100 my-2'>
                        <p className='mb-1'>Enter username</p>
                        <input type="text" placeholder='Enter username'
                            className='form-control w-100 ' id='username'
                            value={user_name} onChange={(e) => setUsername(e.target.value)} />
                    </label>

                    <label htmlFor="email" className='w-100 my-2'>
                        <p className='mb-1'>Enter email</p>
                        <input type="email" placeholder='Enter email'
                            className='form-control w-100 my-1' id='email'
                            value={user_email} onChange={(e) => setEmail(e.target.value)} />
                    </label>

                    <label htmlFor="role" className='w-100 my-2'>
                        <p className='mb-1'>Enter role</p>
                        <input type="text" placeholder='Enter role'
                            className='form-control w-100 my-1' id='role'
                            value={user_role} onChange={(e) => setRole(e.target.value)} />
                    </label>

                    <label htmlFor="password" className='w-100 my-2'>
                        <p className='mb-1'>Enter password</p>
                        <input type="password" placeholder='Enter password'
                            className='form-control w-100 my-1' id='password'
                            value={user_password} onChange={(e) => setPassword(e.target.value)} />
                    </label>

                    <button type='submit' className="btn btn-success w-100 mt-3">LOGIN</button>

                </form>
            </div>
        </>
    );
};

export default index;