import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { supabase } from '@/lib/supabase'

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY! })

const SYSTEM_PROMPT = `You are the Target Roofing virtual assistant on their website. Target Roofing is a commercial and residential roofing company in Southwest Florida (Fort Myers, Naples, Sarasota, Cape Coral, etc.), license #CCC1334168.

Your job is to be helpful, answer roofing questions, AND guide the visitor toward scheduling a free roof inspection or getting a quote. You are friendly, professional, and knowledgeable about roofing.

CONVERSATION FLOW:
1. Greet them and ask how you can help
2. Answer any roofing questions they have (leak repair, roof types, maintenance, storm damage, etc.)
3. When appropriate, offer to schedule a free inspection or get them a quote
4. To schedule, you need to collect: name, email, phone, property address, roof type (if known), and what the issue/need is
5. Once you have their address, tell them you're pulling up a satellite view of their property so they can confirm it's the right location. Include the marker: [SHOW_SATELLITE:ADDRESS] where ADDRESS is their full address.
6. After they confirm the property, collect remaining details and submit the lead
7. When you have all info ready to submit, include the marker: [SUBMIT_LEAD:JSON] where JSON contains: {"firstName","lastName","email","phone","address","roofType","issue"}

IMPORTANT RULES:
- Keep responses SHORT (2-3 sentences max). Be conversational, not robotic.
- Don't ask for all info at once - collect it naturally over the conversation
- You can answer general roofing questions without collecting info
- If they ask about pricing, say Target Roofing offers free estimates and you'd love to get them connected
- Services: new roofs, reroofing/replacement, repairs, maintenance plans, softwash, waterproofing, TPO/PVC, metal roofing, built-up roofing
- Phone: 239-332-5707
- Address: 7011 Nalle Grade Rd, North Fort Myers, FL 33917
- Hours: Mon-Sat 8am-5pm
- Do NOT make up prices or timelines
- If asked something you don't know, offer to connect them with the team`

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] }

    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' as const : 'user' as const,
      parts: [{ text: m.content }],
    }))

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
      contents,
    })

    const text = result.text || ''

    const leadMatch = text.match(/\[SUBMIT_LEAD:(.*?)\]/)
    if (leadMatch) {
      try {
        const leadData = JSON.parse(leadMatch[1])
        const nameParts = (leadData.firstName || '').split(' ')
        await supabase.from('leads').insert({
          form_type: 'contact',
          first_name: nameParts[0] || leadData.firstName,
          last_name: leadData.lastName || nameParts.slice(1).join(' ') || '',
          email: leadData.email,
          phone: leadData.phone,
          street_address: leadData.address,
          service: leadData.roofType || 'Inspection',
          message: leadData.issue || 'Chatbot lead - inspection request',
        })
      } catch {
        // Lead save failed silently - don't break the chat
      }
    }

    const cleanText = text
      .replace(/\[SUBMIT_LEAD:.*?\]/g, '')
      .trim()

    return NextResponse.json({ message: cleanText })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { message: 'Sorry, I\'m having trouble right now. Please call us at 239-332-5707 for immediate help!' },
      { status: 500 }
    )
  }
}
