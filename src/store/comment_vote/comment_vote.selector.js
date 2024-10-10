import { createSelector } from 'reselect';

const selectCommentVoteReducer = (state) => state.commentVote;

export const selectCommentVotes = (commentId) => createSelector(
    [selectCommentVoteReducer],
    (commentVote) => ({
        ...commentVote,
        commentVotes: commentVote.commentVotes.filter(cv => cv.commentId === +commentId),
    })
);