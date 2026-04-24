# -------------------------------
# 🧠 Base Image (lightweight + stable)
# -------------------------------
FROM node:20-alpine

# -------------------------------
# 📁 Set working directory
# -------------------------------
WORKDIR /app

# -------------------------------
# 📦 Copy package files first (for caching)
# -------------------------------
COPY package*.json ./

# -------------------------------
# ⚡ Install dependencies (production only)
# -------------------------------
RUN npm install --production

# -------------------------------
# 📦 Copy entire backend code
# -------------------------------
COPY . .

# -------------------------------
# 🔐 Environment setup
# -------------------------------
ENV NODE_ENV=production
ENV PORT=5000

# -------------------------------
# 🚀 Expose backend port
# -------------------------------
EXPOSE 5000

# -------------------------------
# ⚙️ Start server
# -------------------------------
CMD ["node", "src/server.js"]