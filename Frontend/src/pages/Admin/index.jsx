import { memo, useState } from 'react';
import axios from "axios";
import { get } from "lodash";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, notification, Popconfirm, Table, Tooltip, Modal } from 'antd';

const index = memo(() => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const [inputValue, setInputValue] = useState("");
    const [editData, setEditData] = useState("");
    const token = localStorage.getItem("token");
    const queryClient = useQueryClient();
    const [companyGetId, setCompanyGetId] = useState("");

    const { mutate: deleteHandler } = useMutation({
        mutationFn: (id) => {
            return fetch(`http://localhost:7007/companies/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                },
            })
        },
        onSuccess: (data) => {
            notification.success({
                message: "Successfully Deleted !."
            });
            queryClient.invalidateQueries({ queryKey: ["company"] });
        },
        onError: () => {
            notification.error({
                message: "Error Delete"
            })
        }
    });

    const { mutate: editHandler } = useMutation({
        mutationFn: (id) => {
            console.log(id);
            return fetch(`http://localhost:7007/companies/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                },
                body: JSON.stringify({
                    company_name: editData
                })
            })
        },
        onSuccess: () => {
            notification.success({
                message: "Successfully Edit"
            });
            handleOk();
            queryClient.invalidateQueries({ queryKey: ["company"] });
        },
        onError: () => {
            notification.error({
                message: "Error Edit data"
            })
        }
    })

    const { mutate } = useMutation({
        mutationFn: (values) => {
            console.log(values);
            return fetch("http://localhost:7007/companies/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                },
                body: JSON.stringify(values)
            })
        },
        onSuccess: (data) => {
            notification.success({
                message: "Successfully Created."
            });
            queryClient.invalidateQueries({ queryKey: ["company"] });
        },
        onError: () => {
            notification.error({
                message: "Error Create"
            })
        }
    })

    const { data } = useQuery({
        queryKey: ["company"],
        queryFn: () => {
            return axios.get("http://localhost:7007/companies/read", {
                headers: {
                    "Content-Type": "application/json",
                    token: token
                }
            })
        }
    });

    const value = {
        company_name: inputValue
    }

    return (
        <>
            <Modal
                title="Title"
                open={open}
                onOk={() => editHandler(companyGetId)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Input type='text' placeholder="Name" value={editData} onChange={(e) => setEditData(e.target.value)} />
            </Modal>

            <div className="d-flex justify-content-center w-100 mt-4">
                <div className='content'>

                    <ul style={{ width: "1000px" }} className="nav d-flex justify-content-between mb-3" id="ex1">
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link active"
                                id="ex1-tab-1"
                                data-mdb-toggle="tab"
                                href="#ex1-tabs-1"
                                role="tab"

                                aria-controls="ex1-tabs-1"
                                aria-selected="true"
                            >Company</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link"
                                id="ex1-tab-2"
                                data-mdb-toggle="tab"
                                href="#ex1-tabs-2"
                                role="tab"
                                aria-controls="ex1-tabs-2"
                                aria-selected="false"
                            >Complex</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link"
                                id="ex1-tab-3"
                                data-mdb-toggle="tab"
                                href="#ex1-tabs-3"
                                role="tab"
                                aria-controls="ex1-tabs-3"
                                aria-selected="false"
                            >Room</a>
                        </li>
                    </ul>

                    <div className="tab-content" id="ex1-content">
                        <div
                            className="tab-pane fade show active"
                            id="ex1-tabs-1"
                            role="tabpanel"
                            aria-labelledby="ex1-tab-1"
                        >
                            <Table
                                dataSource={get(data, "data")}
                                columns={
                                    [
                                        {
                                            title: "Compan Name",
                                            dataIndex: "company_name",
                                            key: "company_name"
                                        },
                                        {
                                            title: "Edit",
                                            render: (_, row) => {
                                                return (
                                                    <>
                                                        <Tooltip title="Edit">
                                                            <EditOutlined onClick={() => {
                                                                showModal();
                                                                console.log(get(row, "company_name"), get(row, "company_id"))
                                                                setCompanyGetId(get(row, "company_id"));
                                                                setEditData(get(row, "company_name"))
                                                            }}
                                                                className="text-success" style={{ cursor: "pointer" }} />
                                                        </Tooltip>

                                                    </>
                                                )
                                            }
                                        },
                                        {
                                            title: "Delete",
                                            render: (_, row) => {
                                                return (
                                                    <>

                                                        <Popconfirm
                                                            description="Delete"
                                                            okText="Ok"
                                                            cancelText="No"
                                                            onConfirm={() => deleteHandler(get(row, "company_id"))}
                                                        >
                                                            <Tooltip title="Delete">
                                                                <DeleteOutlined className="text-danger" style={{ cursor: "pointer" }} />
                                                            </Tooltip>
                                                        </Popconfirm>

                                                    </>
                                                )
                                            }
                                        }
                                    ]
                                }
                            />
                            <div className='mt-5'>
                                <Input placeholder='title' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                                <Button onClick={() => mutate(value)} type="primary" className="w-100 mt-3">Submit</Button>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                            <Table
                                dataSource={[]}
                                columns={
                                    [
                                        {
                                            title: ""
                                        },

                                    ]
                                }
                            />
                        </div>
                        <div className="tab-pane fade" id="ex1-tabs-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                            <Table
                                dataSource={[]}
                                columns={
                                    [
                                        {
                                            title: ""
                                        }
                                    ]
                                }
                            />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
});

export default index;