import { createContext, useContext, useReducer } from "react";

const ExamContext = createContext();

const initialState = {
  trustScore: 100,
  riskLevel: "Trusted",
  cheatingProbability: 0,
  alerts: [],
  sessionActive: false,
  timeline: [],
};

const examReducer = (state, action) => {
  switch (action.type) {
    case "START_SESSION":
      return {
        ...state,
        sessionActive: true,
        timeline: [...state.timeline, "Exam Started"],
      };

    case "UPDATE_RISK":
      return {
        ...state,
        trustScore: action.payload.trustScore,
        riskLevel: action.payload.riskLevel,
        cheatingProbability: action.payload.cheatingProbability,
        timeline: [
          ...state.timeline,
          `Risk updated: ${action.payload.riskLevel}`,
        ],
      };

    case "ADD_ALERT":
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };

    case "ADD_TIMELINE_EVENT":
      return {
        ...state,
        timeline: [...state.timeline, action.payload],
      };

    case "RESET_SESSION":
      return initialState;

    default:
      return state;
  }
};

export const ExamProvider = ({ children }) => {
  const [state, dispatch] = useReducer(examReducer, initialState);

  return (
    <ExamContext.Provider value={{ state, dispatch }}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => useContext(ExamContext);