import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface HomeInfo {
  name: string;
  profession: string;
  phone: string;
  email: string;
  linkedin: string;
}

export interface TimelineEntry {
  Company: string;
  Title: string;
  Duration: string;
  Location: string;
  Desc: string;
}

export interface Accolade {
  Type: string;
  Title: string;
  Link: string;
  Desc: string;
}

export async function getHome(): Promise<HomeInfo> {
  const res = await axios.get(`${BASE_URL}/home`);
  return res.data.info;
}

export async function getWork(): Promise<TimelineEntry[]> {
  const res = await axios.get(`${BASE_URL}/work`);
  return res.data.filter(Boolean);
}

export async function getAccolades(): Promise<Accolade[]> {
  const res = await axios.get(`${BASE_URL}/accolades`);
  return res.data.filter(Boolean);
}

export async function askChatbot(question: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/chatbot/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Something went wrong");
  return data.answer;
}
