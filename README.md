

# 🏡 AI Interior Designer

An AI-powered interior design web application that helps DIY homeowners design beautiful, functional rooms in minutes.

Users upload room photos, enter dimensions, budget, and style preferences, and receive:
- A **professional interior design plan**
- Two layout options with reasoning
- A curated color palette and materials
- Key measurements to avoid costly mistakes
- A budget-aware shopping list
- A realistic AI-generated **“after” image** of the redesigned room

Built with modern cloud and AI best practices using **Microsoft Azure**.

---

## ✨ What This App Does 

**Who it’s for**
- DIY homeowners
- Renters upgrading their space
- First-time home buyers
- Anyone who wants design confidence without hiring an interior designer

**How it works**
1. Upload **3–8 photos** of a room
2. Enter room dimensions, budget level, and preferred styles
3. Click **Generate Plan**
4. Receive a clear, actionable design plan
5. Click **Generate After Image**
6. See an AI-rendered image of the redesigned room

⏱️ Total experience: **under 2 minutes**

---



### Core Value Proposition
> *“Professional interior design guidance — instantly, affordably, and tailored to your exact space.”*

---


## 🏗️ Technical Overview (For Developers)

### Tech Stack
- **Frontend:** Next.js (App Router, React, TypeScript)
- **Backend:** Next.js API Routes
- **AI Models:** Azure OpenAI (text + image generation)
- **Validation:** Zod (schema-first design)
- **Hosting:** Microsoft Azure
- **Source Control:** GitHub

---

## Getting Started


---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- npm
- Azure OpenAI resource with:
  - One **text model deployment**
  - One **image-capable model deployment**
- Git

---

### 1. Clone the Repository
```bash
git clone https://github.com/chapter78v3/ai-interior-designer.git
cd ai-interior-designer

npm install


create .env.local file in the project root
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_API_KEY=<your-api-key>
AZURE_OPENAI_DEPLOYMENT=<text-model-deployment-name>
AZURE_OPENAI_IMAGE_DEPLOYMENT=<image-model-deployment-name>

npm run dev

http://localhost:3000




Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



