import React, {useEffect} from 'react';

import { motion } from 'framer-motion';
import DashboardLayout from "../../layout/DashboardLayout.jsx";
import Count from "../../components/dashboard/Count.jsx";
import { UserPlus, Rss, Hospital, MessageCircleMore } from 'lucide-react';
import {adminStore} from "../../store/adminStore.js";

const AdminHomePage = () => {

    const {doctorCount, doctorRequestCount, userCount, blogCount, hospitalCount, messageCount, specialitiesCount, fetchDoctorCount, fetchDoctorRequestCount, fetchUserCount, fetchBlogCount, fetchHospitalCount, fetchMessageCount, fetchSpecialitiesCount} = adminStore()

    useEffect(() => {
        (async () => {
            await Promise.all([
                fetchDoctorCount(),
                fetchDoctorRequestCount(),
                fetchUserCount(),
                fetchBlogCount(),
                fetchHospitalCount(),
                fetchMessageCount(),
                fetchSpecialitiesCount()
            ])
        })()
    },[])


    const stats = [
        {
            title: "Total Doctors",
            count: doctorCount,
            icon: <UserPlus className="w-6 h-6" />,
            className: "bg-blue-100 text-blue-600"
        },
        {
            title: "Total Doctor Request",
            count: doctorRequestCount,
            icon: <UserPlus className="w-6 h-6" />,
            className: "bg-blue-100 text-blue-600"
        },
        {
            title: "Total Users",
            count: userCount,
            icon: <UserPlus className="w-6 h-6" />,
            className: "bg-indigo-100 text-green-600"
        },
        {
            title: "Total Blogs",
            count: blogCount,
            icon: <Rss className="w-6 h-6" />,
            className: "bg-blue-100 text-blue-600"
        },
        {
            title: "Total Hospitals",
            count: hospitalCount,
            icon: <Hospital className="w-6 h-6" />,
            className: "bg-indigo-100 text-green-600"
        },
        {
            title: "Total Specialties",
            count: specialitiesCount,
            icon: <UserPlus className="w-6 h-6" />,
            className: "bg-blue-100 text-blue-600"
        },
        {
            title: "Total Message",
            count: messageCount,
            icon: <MessageCircleMore className="w-6 h-6" />,
            className: "bg-indigo-100 text-green-600"
        }
    ];

    return (
        <DashboardLayout>
            <div className="grid grid-cols-12 gap-8 py-5">
                {stats.map((item, index) => (
                    <div key={index} className="col-span-12 sm:col-span-6 md:col-span-4">
                        <motion.div
                            initial={{opacity: 0, y: 30, scale: 0.95}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            transition={{duration: 0.6, ease: "easeOut", delay: index * 0.2}}
                        >
                            <Count
                                title={item.title}
                                count={item?.count}
                                icon={item.icon}
                                className={item.className}
                            />
                        </motion.div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
};

export default AdminHomePage;
