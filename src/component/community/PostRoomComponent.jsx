import React, { useEffect, useState } from "react";
import {
  PostTitle,
  PostContent,
  PostDate,
  ReplyFormContainer,
  ReplyInput,
  ReplyButton,
  CommentContainer,
  CommentForm,
  CommentButton,
  PostContainer,
  PostHeader,
  PostAuthor,
  PostViews,
  PostVotes,
  PostUpvote,
  PostDownvote,
  CommentHeader,
  CommentContent,
  PostBody,
  Dropdown,
  WriterInfo,
  TitleContainer,
  InformationContainer,
  SmallInput,
  LargeInput,
  FormContainer,
  ReplyContent,
  CommentText,
} from "../../style/PostRoomStyle";
import CommunityAxiosApi from "../../axios/CommunityAxios";
import { useParams } from "react-router-dom";
import Common from "../../utils/common";
import CommunityRankComponent from "./CommunityRankComponent";
import useWebSocket from "../../context/useWebsocket";
import { HeadText } from "../../style/CommunityPostStyle";

const Post = () => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const [currentCommentPage, setCurrentCommentPage] = useState(0);
  const [totalCommentPages, setTotalCommentPages] = useState(0);
  const [sortType, setSortType] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [replyNickName, setReplyNickName] = useState("");
  const [replyPassword, setReplyPassword] = useState("");
  const segments = post.ipAddress ? post.ipAddress.split(".") : "";
  const ipAddress = `${segments[0]}.${segments[1]}`;
  const [replyOpen, setReplyOpen] = useState({});
  const { id } = useParams();

  const { sendMessage } = useWebSocket(Common.SOCKET_URL, email);

  useEffect(() => {
    const postDetail = async () => {
      try {
        const response = await CommunityAxiosApi.getCommunityDetail(id);
        setPost(response.data);
        const commentResponse = await CommunityAxiosApi.getCommentList(
          id,
          currentCommentPage,
          sortType
        );
        setComments(commentResponse.data.content);
        setTotalCommentPages(commentResponse.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    postDetail();
  }, [id, currentCommentPage]);
  const sendCommentMessage = (
    postId,
    commentId,
    commentContent,
    commenterEmail,
    authorEmail
  ) => {
    const commentMessage = {
      type: "COMMENT",
      postId: postId,
      commentId: commentId,
      commentContent: commentContent,
      commenterEmail: commenterEmail,
      authorEmail: authorEmail,
    };
    sendMessage(commentMessage);
  };
  const commentWrite = async () => {
    try {
      const response = await CommunityAxiosApi.commentWrite(
        email,
        nickName,
        password,
        id,
        newComment,
        null
      );
      setComments([...comments, response.data]);
      setNewComment("");
      sendCommentMessage(
        id,
        response.data.id,
        newComment,
        email ? email : post.ipAddress,
        post.email ? post.email : post.ipAddress
      );
      // 댓글 작성 후 댓글 목록 다시 불러오기
      const commentResponse = await CommunityAxiosApi.getCommentList(
        id,
        currentCommentPage
      );
      setComments(commentResponse.data.content);
    } catch (error) {
      console.error(error);
    }
  };
  // 대댓글 작성 함수
  const replyWrite = async (parentCommentId) => {
    try {
      const response = await CommunityAxiosApi.replyWrite(
        email,
        replyNickName,
        replyPassword,
        id,
        newReply,
        parentCommentId
      );
      sendCommentMessage(
        id,
        response.data.id,
        newReply,
        email ? email : post.ipAddress,
        post.email ? post.email : post.ipAddress
      );
      // 댓글 목록 다시 불러오기
      const commentResponse = await CommunityAxiosApi.getCommentList(
        id,
        currentCommentPage
      );
      setComments(commentResponse.data.content);
      setNewReply("");
    } catch (error) {
      console.error(error);
    }
  };
  const vote = async (isUpvote) => {
    try {
      await CommunityAxiosApi.vote(id, isUpvote);
      const response = await CommunityAxiosApi.getCommunityDetail(id);
      setPost(response.data);
      if (isUpvote) {
        alert("추천이 완료되었습니다.");
      } else {
        alert("비추천이 완료되었습니다.");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        alert("오류가 발생하였습니다.");
      }
    }
  };
  // 부모 댓글에만 대댓글을 작성할수 있다.
  const toggleReplyForm = (commentId, parentCommentId) => {
    if (parentCommentId === null) {
      setReplyOpen((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
      console.log(parentCommentId);
    }
  };

  return (
    <PostContainer>
      <CommunityRankComponent />
      <PostHeader>
        <WriterInfo>
          <PostAuthor>
            {post.email ? post.email : `${post.nickName}(${ipAddress})`}
          </PostAuthor>
          <PostDate> {Common.formatDate(post.regDate)}</PostDate>
        </WriterInfo>
        <TitleContainer>
          <PostTitle>{post.title}</PostTitle>
          <PostViews>조회수: {post.viewCount}</PostViews>
        </TitleContainer>
      </PostHeader>
      <PostBody>
        <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
      </PostBody>
      <PostVotes>
        <PostUpvote onClick={() => vote(true)}>추천</PostUpvote>
        <PostTitle>{post.voteCount}</PostTitle>
        <PostDownvote onClick={() => vote(false)}>비추천</PostDownvote>
      </PostVotes>
      <CommentHeader>
        전체 댓글 수: {comments.length}
        <Dropdown
          options={["최신순", "등록순", "답글순"]}
          onChange={(selected) => setSortType(selected.value)}
        />
      </CommentHeader>

      <CommentContainer>
        {comments
          .filter((comment) => comment.parentCommentId === null)
          .map((comment) => (
            <div key={comment.commentId}>
              <CommentContent>
                <>{comment.nickName}</>
                <>{Common.formatDate(comment.regDate)}</>
                <HeadText
                  onClick={() =>
                    toggleReplyForm(comment.commentId, comment.parentCommentId)
                  }
                >
                  {comment.content}
                </HeadText>
                {replyOpen[comment.commentId] && (
                  <ReplyFormContainer>
                    {!email && (
                      <>
                        <InformationContainer>
                          <FormContainer>
                            <SmallInput
                              type="text"
                              value={replyNickName}
                              onChange={(e) => setReplyNickName(e.target.value)}
                              placeholder="닉네임을 입력하세요"
                            />
                            <SmallInput
                              type="password"
                              value={replyPassword}
                              onChange={(e) => setReplyPassword(e.target.value)}
                              placeholder="비밀번호를 입력하세요"
                            />
                          </FormContainer>
                        </InformationContainer>
                      </>
                    )}
                    <ReplyInput
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                    />
                    <ReplyButton
                      type="button"
                      onClick={() => replyWrite(comment.commentId)}
                      required={nickName && password}
                    >
                      댓글 작성
                    </ReplyButton>
                  </ReplyFormContainer>
                )}
              </CommentContent>
              {comment.childComments &&
                comment.childComments.map((childComment) => (
                  <CommentContent style={{ marginLeft: "20px" }}>
                    <>{childComment.nickName}</>
                    <>{Common.formatDate(childComment.regDate)}</>
                    <HeadText
                      onClick={() =>
                        toggleReplyForm(
                          childComment.commentId,
                          childComment.parentCommentId
                        )
                      }
                    >
                      {childComment.content}
                    </HeadText>
                  </CommentContent>
                ))}
            </div>
          ))}
        {currentCommentPage > 0 && (
          <button onClick={() => setCurrentCommentPage(currentCommentPage - 1)}>
            이전
          </button>
        )}
        {currentCommentPage + 1 < totalCommentPages && (
          <button onClick={() => setCurrentCommentPage(currentCommentPage + 1)}>
            다음
          </button>
        )}
        <CommentForm>
          <FormContainer>
            {!email && (
              <>
                <InformationContainer>
                  <FormContainer>
                    <SmallInput
                      type="text"
                      value={nickName}
                      onChange={(e) => setNickName(e.target.value)}
                      placeholder="닉네임을 입력하세요"
                    />
                    <SmallInput
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="비밀번호를 입력하세요"
                    />
                  </FormContainer>
                </InformationContainer>
              </>
            )}
            <LargeInput
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <CommentButton
              type="button"
              onClick={commentWrite}
              required={nickName && password}
            >
              댓글 작성
            </CommentButton>
          </FormContainer>
        </CommentForm>
      </CommentContainer>
    </PostContainer>
  );
};

export default Post;
