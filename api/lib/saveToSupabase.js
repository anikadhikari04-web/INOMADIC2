/**
 * Isolated Supabase storage module for form submissions.
 * 
 * This module can be safely removed without affecting the email system.
 * To disable Supabase storage, simply remove the call to saveToSupabase()
 * in api/sendEmail.js — the email logic will continue to work independently.
 * 
 * Required environment variables:
 *   SUPABASE_URL     — Your Supabase project URL
 *   SUPABASE_ANON_KEY — Your Supabase anon/public key
 */

import { createClient } from "@supabase/supabase-js";

/**
 * Save a form submission to the Supabase `messages` table.
 *
 * @param {Object} params
 * @param {string} params.name      — Sender's name (required)
 * @param {string} params.email     — Sender's email (required)
 * @param {string} params.message   — Message body (required)
 * @param {string|null} params.portfolio — Portfolio link (optional)
 * @param {"contact"|"portfolio"} params.type — Submission type (required)
 *
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function saveToSupabase({ name, email, message, portfolio, type }) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[saveToSupabase] Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    return { success: false, error: "Database configuration missing" };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("messages").insert({
      name,
      email,
      message,
      portfolio: portfolio || null,
      type,
    });

    if (error) {
      console.error("[saveToSupabase] Insert failed:", error.message);
      return { success: false, error: error.message };
    }

    console.log(`[saveToSupabase] Saved ${type} submission from ${email}`);
    return { success: true };
  } catch (err) {
    console.error("[saveToSupabase] Unexpected error:", err);
    return { success: false, error: String(err) };
  }
}
