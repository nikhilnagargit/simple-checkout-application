'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'


// login the current user
export async function login(formdata:{email:string,password:string}) {
  const supabase = createClient()
  const { error} = await supabase.auth.signInWithPassword(formdata)
  if(error){
    return error?.message;
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formdata:{email:string,password:string}) {
  const supabase = createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs

  const {error,data} = await supabase.auth.signUp(formdata)

  if(!error && data.session===null){
    return "User Already Exists.";
  }

  if(error){
    return error?.message;
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut()
  redirect('/login');
}

