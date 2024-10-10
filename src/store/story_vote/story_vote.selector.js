import { createSelector } from 'reselect';

const selectStoryVoteReducer = (state) => state.storyVote;

export const selectStoryVotes = (storyId) => createSelector(
    [selectStoryVoteReducer],
    (storyVote) => ({
        ...storyVote,
        storyVotes: storyVote.storyVotes.filter(vote =>  vote.storyId === storyId),
    })
);