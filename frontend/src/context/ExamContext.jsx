import { createContext, useContext, useReducer, useEffect } from 'react';
import { socket, connectSocket, disconnectSocket, sendTelemetry } from '../services/socket.js';

const ExamContext = createContext();

const initialState = {
  sessionId: null,
  examId: null,
  status: 'IDLE', // IDLE, ACTIVE, FORCE_SUBMITTED
  trustScore: 100,
  riskLevel: 'TRUSTED',
  cheatingProbability: 0,
  events: []
};

function examReducer(state, action) {
  switch (action.type) {
    case 'START_EXAM':
      return { ...state, sessionId: action.payload.sessionId, examId: action.payload.examId, status: 'ACTIVE' };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'UPDATE_RISK':
      return {
        ...state,
        trustScore: action.payload.trustScore,
        riskLevel: action.payload.riskLevel,
        cheatingProbability: action.payload.cheatingProbability,
        status: action.payload.status || state.status
      };
    case 'FORCE_SUBMIT':
      return { ...state, status: 'FORCE_SUBMITTED' };
    default:
      return state;
  }
}

export function ExamProvider({ children }) {
  const [state, dispatch] = useReducer(examReducer, initialState);

  useEffect(() => {
    if (state.sessionId && state.status === 'ACTIVE') {
      connectSocket(state.sessionId);

      socket.on('risk_update', (data) => {
        dispatch({ type: 'UPDATE_RISK', payload: data });
      });

      socket.on('force_submit', () => {
        dispatch({ type: 'FORCE_SUBMIT' });
      });

      return () => {
        socket.off('risk_update');
        socket.off('force_submit');
        disconnectSocket();
      };
    }
  }, [state.sessionId, state.status]);

  const reportEvent = (event) => {
    dispatch({ type: 'ADD_EVENT', payload: event });
    if (state.sessionId) {
      sendTelemetry(state.sessionId, event);
    }
  };

  return (
    <ExamContext.Provider value={{ state, dispatch, reportEvent }}>
      {children}
    </ExamContext.Provider>
  );
}

export const useExam = () => useContext(ExamContext);