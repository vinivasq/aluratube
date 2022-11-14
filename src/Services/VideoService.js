import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://ygvdjeuwqrxllehzxqmu.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmRqZXV3cXJ4bGxlaHp4cW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNzExMzMsImV4cCI6MTk4Mzk0NzEzM30.BM3U6NF7o3pRaOmtZa7Kh3_MKIw2poKFfEnAGuRA7Wk"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video").select("*")
        }
    }
}