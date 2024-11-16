import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import './CommentSection.css';
import Actions from './Actions';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TextField from '@mui/material/TextField';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { addCommentToDb, getCommentsFromDb } from '../firebaseCRUD';
import { getUserData } from '../firebaseCRUD';
import LikeComment from './LikeComment';


export default function CommentSection({ userData, postData }) {
	const [postComments, setPostComments] = useState([]);
	const [loading, setLoading] = useState(false);
	const [addCommentLoader, setAddCommentLoader] = useState(false);
	const [comment, setComment] = useState('');
	let { user } = useContext(AuthContext);
	const [userDetails, setUserDetails] = useState(false);
	useEffect(() => {
		setLoading(true);
		getUserData(user).then(async (res) => {
			let result = await fetchComments();
			setUserDetails(res);
			setPostComments(result);
			setLoading(false);
		});
	}, [user]);

	const fetchComments = async () => {
		const commentsArr = await Promise.all(postData.comments.map(async (comntId) => {
			let x = await getCommentsFromDb(comntId);
			return x;
		}));

		return commentsArr;
		
	};

	

	async function handleCommentSubmit() {
		setAddCommentLoader(true);
		let commentData = {
			postId: postData.postId,
			comment: comment,
			userProfileImage: userDetails.profileURL,
			userName: userDetails.fullName,
			likedBy:[]
		}
		await addCommentToDb(commentData, 'comments', commentData.postId);
		setComment('');
		const commentsList = [...postComments, commentData];
		setPostComments(commentsList);
		setAddCommentLoader(false);
	}

	return (
		<div className='comments-parent-wrapper'>
			<div className='comments-nav'>
				<div className='profile-wrapper'>
					<Avatar
						alt="Remy Sharp"
						src={postData.userProfile}
						sx={{ width: 62, height: 62 }}
					/>
				</div>
				<div style={{ placeContent: 'center' }}>
					<h3>{
						postData.uName
					}</h3>
				</div>
			</div>
			<div className='comments-content'>
				<div className='comments'>
					{
						loading == true ? <div className='loader'><CircularProgress /></div> : <>
							{
								postComments && postComments.map((comment) => (
									<>
										{
											<div className='cmnt-div'>
												<div>
													<Avatar alt="Remy Sharp" src={comment.userProfileImage} />
												</div>
												<div className='comment-wrapper'>
													<div className='user-name-comment'>
														<strong style={{ marginRight: '0.5em' }}>{comment.userName}</strong>
														<label>{comment.comment}</label>
													</div>
													<div className='like-comment'>
														{userDetails != false && <LikeComment commentData={comment} userDetails={userDetails}></LikeComment>}
													</div>
												</div>
											</div>
										}
									</>
								))
							}
							{addCommentLoader && <div className='loader'><CircularProgress size='15px' /></div>}
						</>
					}
				</div>
			</div>
			<div className='comments-actions'>
				<div className='comment-icons'>
					<div className='like-comment-share'>
						<Actions userData={userData} postData={postData}></Actions>
					</div>
					<div className='save-icon'>
						<TurnedInNotIcon></TurnedInNotIcon>
					</div>
				</div>
				<div className='likes-section'>
					<strong>1,324 Likes</strong>
				</div>
				<div className='comment-text-box'>
					<TextField id="outlined-basic" fullWidth label="Comment" value={comment} variant="outlined" onChange={(e) => { setComment(e.target.value) }}
						slotProps={{
							input: {
								startAdornment: <InsertEmoticonIcon position="start"></InsertEmoticonIcon>,
								endAdornment: <Button onClick={() => handleCommentSubmit()} variant="text" disabled={false}>Post</Button>
							},
						}}
					>
					</TextField>
				</div>
			</div>
		</div>
	)
}
