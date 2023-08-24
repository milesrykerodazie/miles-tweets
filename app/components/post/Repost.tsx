import React, { FC } from "react";
import RepostForm from "../RepostForm";
import { SinglePostTypes } from "@/types";

interface RepostPropTypes {
  postId: string;
  userImage: string;
  postData: SinglePostTypes;
  secondary: boolean;
}

const Repost: FC<RepostPropTypes> = ({
  postId,
  userImage,
  postData,
  secondary,
}) => {
  return (
    <RepostForm
      placeholder="Add your quote!"
      secondary={secondary}
      userImage={userImage}
      postData={postData}
    />
  );
};

export default Repost;
