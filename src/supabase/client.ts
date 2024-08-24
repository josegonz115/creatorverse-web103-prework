import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const URL = 'https://zansriwtnjvpumtudfxu.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbnNyaXd0bmp2cHVtdHVkZnh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyMDk2ODEsImV4cCI6MjAzOTc4NTY4MX0.n3xcdwT44DVbC1bShuDCZBW5XAHdZ-6h2VS8f0JUbtM';

const supabase = createClient<Database>(URL, API_KEY);

export default supabase;