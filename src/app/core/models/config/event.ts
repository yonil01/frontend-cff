export interface Event {
  id: string;
  name: string;
  description: string;
  event_date: Date;
  is_disable?: string;
  is_enable?: number;
  user_id?: boolean;
  process?: string;
  created_at?: Date;
  updated_at?: Date;
}
