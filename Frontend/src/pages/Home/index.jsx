import { Select } from 'antd';
import React, { memo, useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';

const index = memo(() => {
    let token = localStorage.getItem("token");

    const [company, setCompany] = useState();
    const [complex, setComplex] = useState();
    const [room, setRoom] = useState();
    const [bank, setBank] = useState();

    useEffect(() => {
        const getCompanies = async () => {
            let getData = await axios.get("http://localhost:7007/companies/read", {
                headers: {
                    token: token
                }
            }).then((response) => setCompany(response.data))
        }
        getCompanies();

    }, []);

    const nextData = async (id) => {
        await axios.get(`http://localhost:7007/complex/read/${id}`, {
            headers: {
                token: token
            }
        }).then((response) => setComplex(response.data))
    }
    console.log(complex);


    const nextRoom = async (id) => {
        await axios.get(`http://localhost:7007/room/read/${id}`, {
            headers: {
                token: token
            }
        }).then((response) => setRoom(response.data))
    }
    console.log(room);

    const postBank = async (id) => {
        await axios.post(`http://localhost:7007/bank/post`, {
            headers: {
                token: token
            }
        }).then((response) => setBank(response.data))
    }
    console.log(bank);


    return (
        <>
            <div className='d-flex align-items-center justify-content-between w-100 mt-5  p-4 shadow-lg'>
                <div className="select">
                    <select onChange={(e) => nextData(e.target.value)} class="form-select browser-default custom-select">
                        <option selected>Open this select menu</option>
                        {
                            company?.map?.((el) => {
                                return <option value={el.company_id}>{el.company_name}</option>
                            })
                        }
                    </select>
                </div>

                <div className="select">
                    <select onChange={(e) => nextRoom(e.target.value)} class="form-select">
                        <option selected>Open complex menu</option>
                        {
                            complex?.map?.((el) => {
                                return <option value={el?.complex_id}>{el?.complex_name}</option>
                            })
                        }
                    </select>
                </div>

                <div className="select">
                    <select class="form-select">
                        <option selected>Open this select menu</option>
                        {
                            room?.map?.((el) => {
                                return <option value={el?.room_id}>{el?.room_count}</option>
                            })
                        }
                    </select>
                </div>

                <div className="select">
                    <select onChange={(e) => postBank(e.target.value)} class="form-select">
                        <option selected>Open this select menu</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
        </>
    );
});

export default index;