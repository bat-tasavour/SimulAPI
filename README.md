# SimulAPI: The Strategic Mocking Engine for High-Velocity Teams

🌟 **Show Your Support**
If you found this project helpful, give it a ⭐️!

> **Engineering Velocity is the only Moat.** If your frontend team is waiting for the backend to be "ready," your growth loop is broken. SimulAPI is the fix.

---

## 🚀 The TL;DR
SimulAPI turns your OpenAPI specs into live, validated, production-grade mock APIs in under 60 seconds. Stop writing mock scripts. Stop paying the "Prompt Tax" for AI-generated JSON. Start shipping.

---

## 🧠 The Strategic Context (Why we built this)

In high-growth companies, **Cycle Time** is the most important metric. The biggest killer of product momentum isn't bad ideas—it's **Dependency Friction.**

### The Problem: The "Backend Bottleneck"
Typically, frontend developers are blocked for days (or weeks) waiting for backend staging environments or finished endpoints. They solve this in two ways, both of which are inefficient:
1. **Manual Mocking:** Writing custom Express servers or MSW scripts that become outdated the second the spec changes.
2. **AI Prompting:** Asking LLMs to "generate dummy JSON for this object." It's repetitive, it wastes tokens, and it provides static, dead data.

### The Solution: The SimulAPI Engine
SimulAPI deletes this friction. By making the **API Specification** (OpenAPI) the single source of truth, we automate the entire simulation layer. 

---

## 🛠️ Core Growth Features

- **Zero-Config Parser:** Drag and drop your OpenAPI JSON/YAML. We handle the dereferencing and mapping instantly.
- **Dynamic Data Generation:** Powered by `json-schema-faker`, every request returns unique, schema-valid data. No static JSON. No manual updates.
- **Native Contract Validation:** Integrated `Ajv` validation. If your frontend sends a request that doesn't match the spec, SimulAPI catches it. 
- **Chaos Mode:** Test your UI resilience. Single-slider controls for **latency (0-5000ms)** and **error rates (0-100%)**.
- **Public Staging URLs:** Point your React/Vue/Mobile app to a persistent project URL. Demo your progress before the database even exists.

---

## 📈 The Integration Flow

1. **Import:** Paste your OpenAPI spec.
2. **Configure:** Set your chaos parameters (latency/errors).
3. **Switch:** Change your app's `BASE_URL` to your SimulAPI project ID.
4. **Ship:** Frontend unblocked. Velocity restored.

---

## 📦 Tech Stack (Built for Scale)

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, shadcn/ui.
- **State:** Zustand (Persistent Auth + UI State).
- **Backend:** Node.js, MongoDB (Mongoose), JWT (Secure HTTP-only cookies).
- **Engine:** Swagger-Parser, json-schema-faker, Ajv (Validation).

---

## 👤 Author: Syed Tasavour

**Scale Specialist | Full Stack Engineer | AWS Architect**

- **GitHub:** [@syedtasavour](https://github.com/syedtasavour)
- **Portfolio:** [syedtasavour.me](https://syedtasavour.me)

---

## 📞 Contact & Support

For any queries, strategic partnerships, or support:

- **Email:** [help@syedtasavour.me](mailto:help@syedtasavour.me)
- **GitHub Issues:** [Create an issue](https://github.com/bat-tasavour/SimulAPI/issues)

**Built with passion (and a lot of coffee) by Syed Tasavour.**
