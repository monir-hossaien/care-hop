import React, {useEffect} from 'react';
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import MessageList from "../../components/dashboard/MessageList.jsx";
import {contactStore} from "../../store/contactStore.js";

const AllMessagePage = () => {

    const {fetchMessageList} = contactStore();

    useEffect(()=>{
        (async ()=>{
            await fetchMessageList();
        })()
    },[])

    return (
        <DashboardLayout>
            <MessageList />
        </DashboardLayout>
    );
};

export default AllMessagePage;