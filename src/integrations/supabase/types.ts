export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          business_description: string | null
          business_name: string | null
          business_size: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          business_description?: string | null
          business_name?: string | null
          business_size?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          business_description?: string | null
          business_name?: string | null
          business_size?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      project_submissions: {
        Row: {
          animations: string[] | null
          autoresponders: boolean | null
          color_palette: string | null
          contact_destination: string | null
          contact_forms: string[] | null
          created_at: string
          design_inspiration: Json | null
          downloads: string | null
          email: string
          exclude_features: string | null
          fonts: string | null
          grand_total: number | null
          has_logo: boolean | null
          id: string
          images_ready: boolean | null
          layout_preference: string | null
          monthly_total: number | null
          one_time_total: number | null
          pages: string | null
          pages_behavior: string | null
          payment_status: string | null
          primary_goal: string | null
          selected_addons: string[] | null
          selected_package: string
          social_integrations: string[] | null
          social_platforms: string | null
          stripe_customer_id: string | null
          stripe_session_id: string | null
          stripe_subscription_id: string | null
          target_audience: string | null
          text_ready: boolean | null
          updated_at: string
          user_id: string | null
          website_type: string[] | null
        }
        Insert: {
          animations?: string[] | null
          autoresponders?: boolean | null
          color_palette?: string | null
          contact_destination?: string | null
          contact_forms?: string[] | null
          created_at?: string
          design_inspiration?: Json | null
          downloads?: string | null
          email: string
          exclude_features?: string | null
          fonts?: string | null
          grand_total?: number | null
          has_logo?: boolean | null
          id?: string
          images_ready?: boolean | null
          layout_preference?: string | null
          monthly_total?: number | null
          one_time_total?: number | null
          pages?: string | null
          pages_behavior?: string | null
          payment_status?: string | null
          primary_goal?: string | null
          selected_addons?: string[] | null
          selected_package: string
          social_integrations?: string[] | null
          social_platforms?: string | null
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
          stripe_subscription_id?: string | null
          target_audience?: string | null
          text_ready?: boolean | null
          updated_at?: string
          user_id?: string | null
          website_type?: string[] | null
        }
        Update: {
          animations?: string[] | null
          autoresponders?: boolean | null
          color_palette?: string | null
          contact_destination?: string | null
          contact_forms?: string[] | null
          created_at?: string
          design_inspiration?: Json | null
          downloads?: string | null
          email?: string
          exclude_features?: string | null
          fonts?: string | null
          grand_total?: number | null
          has_logo?: boolean | null
          id?: string
          images_ready?: boolean | null
          layout_preference?: string | null
          monthly_total?: number | null
          one_time_total?: number | null
          pages?: string | null
          pages_behavior?: string | null
          payment_status?: string | null
          primary_goal?: string | null
          selected_addons?: string[] | null
          selected_package?: string
          social_integrations?: string[] | null
          social_platforms?: string | null
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
          stripe_subscription_id?: string | null
          target_audience?: string | null
          text_ready?: boolean | null
          updated_at?: string
          user_id?: string | null
          website_type?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
