import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    answers: [],
    totalScore: 0,
    runs: 0,
  },
  reducers: {
    addAnswers(state, action) {
      state.answers.push(action.payload);
    },
    calculateScore(state) {
      const yesCount = state.answers.filter(answer => answer === 'yes').length;
      const score = (100 * yesCount) / state.answers.length;
      state.totalScore += score;
      state.runs += 1;
    },
    resetQuiz(state) {
      state.answers = [];
    },
  },
});

export const { addAnswers, calculateScore, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
