import { createClient } from '@supabase/supabase-js'

const config = useRuntimeConfig();
const supabaseUrl = config.public.supabaseUrl;
const supabaseKey = config.public.supabaseKey;

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;