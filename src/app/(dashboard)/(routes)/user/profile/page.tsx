'use client'
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import api from '@/api';
import VideoCard from '../../(courses)/components/VideoCard';
import CourseCard from '../../(courses)/components/CourseCard';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const UserProfile = () => {
  const [loading, setLoading] = useState(true)


  const [profile, setProfile] = useState({
    _id: '',
    name: '',
    username: '',
    email: '',
    bio: '',
    coverImage: {
      url: '',
    },
    avatar: {
      url: '',
    },
    followers: [],
    followings: [],
    followersCount: 0,
    followingsCount: 0,
    postsCount: 0,
    likesCount: 0,
    commentsCount: 0,
    posts: [],
    likes: [],
    comments: [],
    createdAt: '',
    updatedAt: '',
    isFollowing: false,
    isAdmin: false,
    watchedCourses: [],
    watchedVideos: [],
    watchedPosts: [],
    likedCourses: [],
    likedVideos: [],
    likedPosts: [],
    savedVideos: [],
    savedCourses: [],
    savedPosts: [],



  });
  useEffect(() => {
    api.get('/v1/users/get-user-profile')
      .then(res => {
        const user = res.data.data;
        console.log(user);
        setProfile(res.data.data);
        setLoading(false)
      })
      .catch(err => console.error(err));

  }, [])
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };


  return (
    <div className="w-full p-4">
      <div className=" mx-auto mt-10 p-4  w-full  dark:bg-gray-900 dark:text-white">
        {/* Banner Image */}
        <div className="relative h-48 ">
          {
            loading ? <Skeleton className='w-full h-full' /> :
              <Image
                src={profile?.coverImage?.url}
                alt="Banner"
                height={5000}
                width={5000}
                className="object-cover w-full h-full"
              />
          }
          {/* Profile Photo */}
          <div className="absolute -bottom-12 left-4">

            {
              loading ? <Skeleton className='rounded-full border-4 border-white w-24 h-24' /> :
                <Image
                  src={profile?.avatar?.url}
                  alt="Profile"
                  height={500}
                  width={500}
                  className="rounded-full border-4 border-white w-24 h-24"
                />
            }
          </div>
        </div>

        {/* User Info */}
        <div className=" p-4 rounded-lg shadow-md mt-14">
          <div className="flex justify-between items-center">
            {
              loading ?
                <div className='gap-2 flex flex-col'>
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-40" />

                </div>
                :
                <div>
                  <h1 className="text-2xl font-bold">{profile?.name}</h1>
                  <p className="text-gray-600">@{profile?.username}</p>
                  <Link href={`/users/profile/${profile?.username}`} className='text-blue-600 underline flex gap-2'>View Account <ChevronRight /></Link>
                </div>
            }

           
          </div>

          {/* Followers and Following */}
          {
            loading ?
              <div className="flex space-x-6 mt-4">
                <Skeleton className='h-12 w-24' />
                <Skeleton className='h-12 w-24' />
                <Skeleton className='h-12 w-36' />


              </div>
              : <div className="flex space-x-6 mt-4">
                <div>
                  <span className="font-bold">{profile?.followersCount}</span>
                  <p className="text-gray-600">Followers</p>
                </div>
                <div>
                  <span className="font-bold">{profile?.followingsCount}</span>
                  <p className="text-gray-600">Following</p>
                </div>

               
              </div>
          }
        </div>





      </div>
      <div className='w-full '>
        <Tabs defaultValue="history" className=" px-0 w-full ">
          <TabsList className=" overflow-auto  flex  justify-start w-full ">
            <div className=" w-fit  flex">
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
              <TabsTrigger value="saved">saved</TabsTrigger>

            </div>
          </TabsList>
          <TabsContent value="history">
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Videos:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.watchedVideos?.map((video: any) => {
                    if (video?.video_Id) {
                      return (
                        <div key={video?.video_Id}>
                          <VideoCard _id={video?.video_Id} />
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Post:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.watchedPosts?.map((post: any) => {
                    if (post?.post_Id) {
                      return (
                        <div key={post?.post_Id}>
                          <VideoCard videoId={post?.post_Id} />
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Courses:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.watchedCourses?.map((course: any) => {
                    if (course?.course_Id) {
                      return (
                        <div key={course?.course_Id} >
                          <CourseCard _id={course?.course_Id} />
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
          </TabsContent>
          <TabsContent value="liked" className='gap-4'>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Videos:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.likedVideos?.map((video: any) => {
                    if (video?.video_Id) {
                      return (
                        <div key={video?.video_Id}>
                          <VideoCard _id={video?.video_Id} />
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Post:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.likedPosts?.map((post: any) => {
                    if (post?.post_Id) {
                      return (
                        <div key={post?.post_Id}>
                          <VideoCard videoId={post?.post_Id} />
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Courses:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.likedCourses?.map((course: any) => {
                    if (course?.course_Id) {
                      return (
                        <div key={course?.course_Id} >
                          <CourseCard _id={course?.course_Id} />
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>

          </TabsContent>
          <TabsContent value="saved">
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Videos:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.savedVideos?.map((video: any) => {
                    if (video?.video_Id) {
                      return (
                        <div key={video?.video_Id}>
                          <VideoCard _id={video?.video_Id} />
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Post:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.savedPosts?.map((post: any) => {
                    if (post?.post_Id) {
                      return (
                        <div key={post?.post_Id}>
                          <VideoCard videoId={post?.post_Id} />
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
            <Card className='max-h-dvh overflow-auto my-2 w-full'>
              <CardHeader>
                <CardTitle>Courses:</CardTitle>

              </CardHeader>
              <CardContent className="grid xs:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  profile?.savedCourses?.map((course: any) => {
                    if (course?.course_Id) {
                      return (
                        <div key={course?.course_Id} >
                          <CourseCard _id={course?.course_Id} />
                        </div>
                      )
                    }
                  })
                }
              </CardContent>

            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;