import React from 'react';
import {Link, useLocation} from "react-router-dom";

const Post = () => {
    const location = useLocation();
    return (
        <>
            {
                location.pathname === "/posts" ?(
                    <div className="text-center py-32 bg-[url(/images/hero_bg.jpg)] bg-center bg-cover bg-no-repeat">
                        <h1 className="text-4xl text-[#357B7A] font-medium opacity-100">Posts</h1>
                    </div>
                ): (
                    <div className="text-center mt-10">
                        <h1 className="text-4xl text-[#164193] font-bold">Recent Posts</h1>
                    </div>
                )
            }
            <div className="container">
                <div className="grid grid-cols-12 gap-6 py-14">
                    {
                        Array.from({length: 8}).map((_, i) => (
                            <div key={i} className="col-span-12 md:col-span-4">
                                <div className="col-span-12 md:col-span-4 text-gray-500">
                                    <Link to={"/"}><img src="/images/post_image1.jpeg" alt="image"/></Link>
                                    <div className="space-y-4 py-7">
                                        <p>সেপ্টেম্বর ১১, ২০২৪</p>
                                        <Link to={"/"} className="block font-bold text-2xl text-[#1CA288] hover:text-[#164193]">ডেঙ্গু</Link>
                                        <p>'ডেঙ্গু' নামটি কোথা থেকে এসেছে, এ নিয়ে নানা রকম মতামত আছে। তবে ধারণা করা হয়
                                            যে, আফ্রিকার সো...</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Post;