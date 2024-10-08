import api from '@/api';
import React, { useEffect, useState } from 'react'
import { toast } from './ui/use-toast';
import { Chip } from '@mui/joy';
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";

function LikeButton({className , liked, likeCnt , type,_id}:any) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    useEffect(()=>{
        setIsLiked(liked);
        setLikeCount(likeCnt);
    }, [liked, likeCnt])
    const likePostHandler = async() => {
       const response =  await api.post(`/v1/like/${type}/${_id}`);
       console.log(response)
      };
  return (
    <button
    onClick={likePostHandler}
    className={`  flex   justify-center items-center rounded-full  ${className}`}
  >
    <p>{isLiked? <BiSolidLike className="mx-2 p-0" /> : <AiOutlineLike className={` mx-2  p-0`} />}</p>
    <Chip>{likeCount}</Chip>
</button>
  )
}

export default LikeButton