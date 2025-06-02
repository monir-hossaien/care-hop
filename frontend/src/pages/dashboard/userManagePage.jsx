import React, {useEffect} from 'react';
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import UserList from "../../components/dashboard/UserList.jsx";
import {userStore} from "../../store/userStore.js";

const UserManagePage = () => {
    const {fetchUserList} = userStore();

    useEffect(() => {
        (async () => {
            await fetchUserList();
        })()
    }, []);

    return (
        <DashboardLayout>
            <UserList />
        </DashboardLayout>
    );
};

export default UserManagePage;