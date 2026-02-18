import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  // Use the SERVICE key to bypass RLS for server-side inserts
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  // Fetch all messages
  async findAll() { 
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      throw new Error('Failed to fetch guestbook messages');
    }

    return data;
  }

  // Create a new message
  async create(dto: any) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([dto]);

    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error('Failed to insert message');
    }

    return data;
  }

  // Update an existing message by ID
  async update(id: string, dto: any) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .update(dto)
      .eq('id', id);

    if (error) {
      console.error('Supabase update error:', error);
      throw new Error('Failed to update message');
    }

    return data;
  }

  // Delete a message by ID
  async delete(id: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      throw new Error('Failed to delete message');
    }

    return data;
  }
}
