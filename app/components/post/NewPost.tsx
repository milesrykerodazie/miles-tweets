import React from "react";
import Form from "../Form";

const NewPost = ({ userImage }: { userImage: string }) => {
  return (
    <Form
      placeholder="What is happening?!"
      secondary={true}
      userImage={userImage}
    />
  );
};

export default NewPost;
