export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#05060A',
          cyan: '#00E5FF',
          purple: '#7C4DFF',
          danger: '#FF3B3B',
          warning: '#FFB020',
          success: '#00C853',
          panel: 'rgba(11, 17, 32, 0.75)',
          border: 'rgba(0, 229, 255, 0.2)',
        }
      },
      animation: {
        'scan': 'scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
};