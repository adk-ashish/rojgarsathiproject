import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { get_application_details } from "@/Services/job";
import { InfinitySpin } from "react-loader-spinner";
import NavBar from "@/components/NavBar";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import GridWithBackground from "@/components/background";

export default function ApplicationsDetail() {
  const router = useRouter();
  const { id } = router.query;

  const user = useSelector((state) => state?.User?.userData);
  const userId = user?._id;

  useEffect(() => {
    if (!userId || !Cookies.get("token")) {
      router.push("/auth/login");
    }
  }, [user, userId, Cookies]);

  const { data, error, isLoading } = useSWR("/get-application-details", () =>
    get_application_details(id),
  );

  if (error) return toast.error(error) && router.push("/frontend/postedJob");

  return (
    <>
      {isLoading ? (
        <div className="bg-gray w-full h-screen flex items-center flex-col justify-center">
          <InfinitySpin width="200" color="#4f46e5" />
          <p className="text-xs uppercase">Loading Resources Hold Tight...</p>
        </div>
      ) : (
        <>
          <NavBar />
          <div className="w-full px-4 flex flex-wrap  pt-20 justify-center items-center">
            <div className="w-full h-32 bg-gray-50 text-indigo-600 font-bold flex items-center justify-center flex-col">
              <h1 className="text-3xl">Application Detail</h1>
            </div>
            <div className="flex flex-col self-center max-w-sm w-full rounded overflow-hidden shadow-lg">
              <div className="flex py-2">
                <h1 className="text-base font-semibold px-2 ">Name</h1>
                <p className="text-sm px-2">{data?.data?.name}</p>
              </div>
              <div className="flex py-2">
                <h1 className="text-base font-semibold px-2 ">Email</h1>
                <p className="text-sm px-2">{data?.data?.email}</p>
              </div>
              <div className="flex py-2">
                <h1 className="text-base font-semibold px-2 ">Summary</h1>
                <p className="text-sm px-2">{data?.data?.user.cv.summary}</p>
              </div>
              <div className="flex py-2">
                <h1 className="text-base font-semibold px-2 ">See Grade</h1>
                <p className="text-sm px-2">{data?.data?.user.cv.seeGrade}</p>
              </div>
              <div className="flex py-2">
                <h1 className="text-base font-semibold px-2 ">
                  Undergraduate Grade
                </h1>
                <p className="text-sm px-2">{data?.data?.user.cv.undergrad}</p>
              </div>
              <div className="flex py-2">
                <h1 className="text-base font-semibold px-2 ">
                  Graduate Grade
                </h1>
                <p className="text-sm px-2">{data?.data?.user.cv.graduate}</p>
              </div>
              <div className="flex py-2">
                <h1 className="text-base font-semibold px-2 ">Skills</h1>
                <p className="text-sm px-2">
                  {data?.data?.user.cv.programmingSkills}
                </p>
              </div>
              <div className="flex py-2">
                <h1 className="text-base font-semibold px-2 ">Hobbies</h1>
                <p className="text-sm px-2">{data?.data?.user.cv.hobbies}</p>
              </div>
              <div className="flex py-2">
                <h1 className="text-base font-semibold px-2 ">Experience</h1>
                <p className="text-sm px-2">
                  {data?.data?.user.cv.experienceYears} years
                </p>
              </div>
              <div className="flex py-2">
                <h1 className="text-base font-semibold px-2 ">
                  Application Status
                </h1>
                <p className="text-sm px-2 uppercase font-extrabold">
                  {data?.data?.status}
                </p>
              </div>
            </div>
            <GridWithBackground />
          </div>
        </>
      )}
    </>
  );
}
