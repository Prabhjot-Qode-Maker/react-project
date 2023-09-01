
import Managerprofile from "../Managerprofile"
import React, { useEffect, useState, useMemo } from 'react';
import ThumbUpOffAlt from "@mui/icons-material/ThumbUpOffAlt";
// import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import Bookmark from "@mui/icons-material/Bookmark";
import Likeicn from "../../../assets/explore/like.svg";
import Pagination from '../../../theme/Pagination/Pagination';
import Commenticn from "../../../assets/explore/comment.svg";
import Shareicn from "../../../assets/explore/Share.svg";
import Saveicn from "../../../assets/explore/save.svg";

import { posts } from './postData.js';


function Activity(props) {
  const [posts, setPosts] = useState([]); 
  const [profile_img, setProfile_img]= useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize] = useState(5); 
      const [users, setUsers] = useState([]);
      const [liked, setLiked] = useState(false);
      const [userPhoto, setUserPhoto] = useState('');
      const [userName, setUserName] = useState('');
      const [userid, setUserId] = useState(props.userId);
      const [userContent, setUserContent] = useState('');
      const [likesCount, setLikesCount] = useState(0);
      const [shareCount, setShareCount] = useState(0);
      const [commentInput, setCommentInput] = useState('');
      const [isClicked, setIsClicked] = useState(false);
      const [comments, setComments] = useState([]);
      const [saved, setSaved] = useState(false);
    
    
    
    
      useEffect(() => {
        fetchPosts();
      }, []);
      
      const fetchPosts = async () => {
        try {
          const uIdCookie = document.cookie
            .split(';')
            .map(cookie => cookie.trim())
            .find(cookie => cookie.startsWith('u_id='));
      
          if (!uIdCookie) {
            console.error('u_id cookie not found');
            return;
          }
      
          const uIdValue = uIdCookie.split('=')[1];
      
          const response = await fetch(`http://prometheus.webproject.live/v1/api/posts/find-post-userid?userID=${uIdValue}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            const responseData = await response.json();
            const sortedPosts = responseData.data.sort((a, b) => b.id - a.id);
            const reversedPosts = sortedPosts.reverse();
            setPosts(reversedPosts);
          } else {
            console.error('Error fetching posts:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
      const currentTabledata = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return posts.slice(firstPageIndex, lastPageIndex);
      }, [currentPage, PageSize, posts]);

  return (

    <>
    <Managerprofile/>
    {currentTabledata.map((post) => (
        <div key={post.id} >
          <div>
            <div
              className='user-profile-use-activity'
            >
              <div style={{ display: 'flex', alignItems: 'center', padding: '0', paddingBottom:'1rem' }}>
                <img
                  src={post.profile_img}
                  alt="User Profile"
                  style={{ borderRadius: '50%', marginRight: '12px', width: '73px' }}
                />
                <div>
                <h3 style={{ margin: 0, color: '#63171c',textTransform:'capitalize' }}>{post.name}</h3>
                <span style={{marginTop: 0, fontSize:'12px',textTransform:'capitalize', color:'#63171c',fontWeight:'600',fontSize:'14px'}}>{post.user_group} . <span>{new Date(post.created_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })}</span></span>
                </div>
              </div>


              <div>
                <p style={{ margin: 0, width: '100%', margin: 'auto', lineHeight: '1.5rem' }}>{post.title}</p>
                <p style={{marginLeft:'14px'}}>{post.content}</p>
              </div>
              {post.imageDataUrl && (
              <div>
                <img src={post.imageDataUrl} alt="Uploaded" style={{ width: '100%', height: '300px' }} />
              </div>
              )}
              {/* Render the uploaded link if available */}
              {post.uploadedLink && (
                <div>
                  <a href={post.uploadedLink}>{post.uploadedLink}</a>
                </div>
              )}

              {/* Comment and Share */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', alignItems: 'center' }}>
                <div>
                  <span style={{ marginRight: '0.5rem' }}>Like</span>
                  {/* Add comment icon here */}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span>Comment</span>
                  {/* Add share icon here */}
                  <span>Share</span>
                </div>
              </div>

              {/* Like, Comment, Share, Save */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  alignItems: 'center',
                  borderTop: '2px solid rgb(204, 204, 204)',
                }}
              >
               <div  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color:'#3a3939fc' }} className='like_sec_cstm'>
<img src={Likeicn} size={30} style={{ margin: '0 0.5rem', color: '#1778F2', cursor:'pointer', width:'30px' }} className="cstm_act_icn" />
  <span > Like</span>
</div>
<div  style={{ display: 'flex', alignItems: 'center', marginRight: '1rem', cursor: 'pointer', color:'#3a3939fc'}} className='like_sec_cstm'>
<img src={Commenticn} size={30} style={{ margin: '0 0.5rem', color: '#1778F2', cursor:'pointer', width:'30px' }} className="cstm_act_icn" />
  <span > Comment</span>
</div>
<div  style={{ display: 'flex', alignItems: 'center', marginRight: '1rem', cursor: 'pointer', color:'#3a3939fc' }} className='like_sec_cstm'>
<img src={Shareicn} size={30} style={{ margin: '0 0.5rem', color: '#1778F2', cursor:'pointer', width:'30px' }} className="cstm_act_icn" />
  <span > Share</span>
</div>           <div  style={{ display: 'flex', alignItems: 'center', marginRight: '1rem', cursor: 'pointer', color:'#3a3939fc' }} className='like_sec_cstm'>
<img src={Saveicn} size={30} style={{ margin: '0 0.5rem', color: '#1778F2', cursor:'pointer', width:'30px' }} className="cstm_act_icn" />
  <span > Save</span>
</div>
              </div>

              {/* View all comments */}
              <div style={{ padding: '1rem' }}>
                <span style={{textDecoration:'underline',fontSize:'14px',fontWeight:'500'}}>View all comments</span>
                {/* Add icon for view all comments here */}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', padding: '0',paddingTop:'0', justifyContent: 'flex-start' }}>
                <img
                  src={post.profile_img}
                  alt="User Profile"
                  style={{ borderRadius: '50px', marginRight: '15px', width: '50px',marginTop:'-18px' }}
                />
                <form
                  onSubmit={(event) => handleComment(event, post.user_id)}
                  style={{ display: 'flex', alignItems: 'center', width: '90%' }}
                >
                  <input
                    type="text"
                    name="commentInput"
                    placeholder="Share your comment here"
                    style={{
                      marginBottom:'0',
                      marginRight: '1rem',
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '20px',
                      backgroundColor: '#f0f1ee',
                      border: '0px',
                    }}
                    value={commentInput}
                    onChange={(event) => setCommentInput(event.target.value)}
                  />
                  {commentInput && <button type="submit">Share Comment</button>}
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
  <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={posts.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  )
}

export default Activity
