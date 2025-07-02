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
      analysis_benchmarks: {
        Row: {
          benchmark_data: Json
          created_at: string | null
          id: string
          industry: string
          last_updated: string | null
          percentile_data: Json | null
          sample_size: number | null
          skill_category: string
        }
        Insert: {
          benchmark_data: Json
          created_at?: string | null
          id?: string
          industry: string
          last_updated?: string | null
          percentile_data?: Json | null
          sample_size?: number | null
          skill_category: string
        }
        Update: {
          benchmark_data?: Json
          created_at?: string | null
          id?: string
          industry?: string
          last_updated?: string | null
          percentile_data?: Json | null
          sample_size?: number | null
          skill_category?: string
        }
        Relationships: []
      }
      analysis_queue: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_details: Json | null
          id: string
          max_retries: number | null
          priority: number | null
          retry_count: number | null
          scheduled_for: string | null
          started_at: string | null
          status: string | null
          video_analysis_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_details?: Json | null
          id?: string
          max_retries?: number | null
          priority?: number | null
          retry_count?: number | null
          scheduled_for?: string | null
          started_at?: string | null
          status?: string | null
          video_analysis_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_details?: Json | null
          id?: string
          max_retries?: number | null
          priority?: number | null
          retry_count?: number | null
          scheduled_for?: string | null
          started_at?: string | null
          status?: string | null
          video_analysis_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analysis_queue_video_analysis_id_fkey"
            columns: ["video_analysis_id"]
            isOneToOne: false
            referencedRelation: "video_analyses"
            referencedColumns: ["id"]
          },
        ]
      }
      app_access: {
        Row: {
          app_id: string
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          app_id: string
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          app_id?: string
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      app_access_logs: {
        Row: {
          accessed_at: string | null
          app_id: string
          id: string
          user_id: string | null
        }
        Insert: {
          accessed_at?: string | null
          app_id: string
          id?: string
          user_id?: string | null
        }
        Update: {
          accessed_at?: string | null
          app_id?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      assessments: {
        Row: {
          created_at: string | null
          id: string
          profile: Json | null
          score_breakdown: Json | null
          score_level: string | null
          score_total: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          profile?: Json | null
          score_breakdown?: Json | null
          score_level?: string | null
          score_total?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          profile?: Json | null
          score_breakdown?: Json | null
          score_level?: string | null
          score_total?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      availability_updates: {
        Row: {
          availability_status: Database["public"]["Enums"]["availability_status"]
          available_from: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          location_preferences: string[] | null
          notes: string | null
          notice_period_days: number | null
          preferred_work_type: string | null
          profile_id: string
          salary_expectation_max: number | null
          salary_expectation_min: number | null
          updated_at: string | null
        }
        Insert: {
          availability_status: Database["public"]["Enums"]["availability_status"]
          available_from?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          location_preferences?: string[] | null
          notes?: string | null
          notice_period_days?: number | null
          preferred_work_type?: string | null
          profile_id: string
          salary_expectation_max?: number | null
          salary_expectation_min?: number | null
          updated_at?: string | null
        }
        Update: {
          availability_status?: Database["public"]["Enums"]["availability_status"]
          available_from?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          location_preferences?: string[] | null
          notes?: string | null
          notice_period_days?: number | null
          preferred_work_type?: string | null
          profile_id?: string
          salary_expectation_max?: number | null
          salary_expectation_min?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "availability_updates_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "availability_updates_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "availability_updates_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "availability_updates_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "availability_updates_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      candidate_communications: {
        Row: {
          candidate_id: string
          clicked_at: string | null
          communication_type: string
          created_at: string | null
          delivery_status: string | null
          id: string
          message_content: string
          opened_at: string | null
          recruiter_id: string
          replied_at: string | null
          sent_at: string | null
          subject: string | null
          trigger_event: string
        }
        Insert: {
          candidate_id: string
          clicked_at?: string | null
          communication_type: string
          created_at?: string | null
          delivery_status?: string | null
          id?: string
          message_content: string
          opened_at?: string | null
          recruiter_id: string
          replied_at?: string | null
          sent_at?: string | null
          subject?: string | null
          trigger_event: string
        }
        Update: {
          candidate_id?: string
          clicked_at?: string | null
          communication_type?: string
          created_at?: string | null
          delivery_status?: string | null
          id?: string
          message_content?: string
          opened_at?: string | null
          recruiter_id?: string
          replied_at?: string | null
          sent_at?: string | null
          subject?: string | null
          trigger_event?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_communications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "candidate_communications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_communications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "candidate_communications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "candidate_communications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "candidate_communications_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "candidate_communications_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_communications_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "candidate_communications_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "candidate_communications_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      candidate_matches: {
        Row: {
          ai_confidence: number | null
          candidate_id: string
          concerns: string[] | null
          created_at: string | null
          culture_match: number
          experience_match: number
          id: string
          job_id: string
          overall_score: number
          reasoning: string | null
          recruiter_rating: number | null
          recruiter_viewed: boolean | null
          skills_match: number
          strengths: string[] | null
        }
        Insert: {
          ai_confidence?: number | null
          candidate_id: string
          concerns?: string[] | null
          created_at?: string | null
          culture_match: number
          experience_match: number
          id?: string
          job_id: string
          overall_score: number
          reasoning?: string | null
          recruiter_rating?: number | null
          recruiter_viewed?: boolean | null
          skills_match: number
          strengths?: string[] | null
        }
        Update: {
          ai_confidence?: number | null
          candidate_id?: string
          concerns?: string[] | null
          created_at?: string | null
          culture_match?: number
          experience_match?: number
          id?: string
          job_id?: string
          overall_score?: number
          reasoning?: string | null
          recruiter_rating?: number | null
          recruiter_viewed?: boolean | null
          skills_match?: number
          strengths?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "candidate_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "candidate_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "candidate_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "candidate_matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_pipeline_positions: {
        Row: {
          candidate_id: string
          created_at: string | null
          current_stage_id: string
          id: string
          job_posting_id: string | null
          moved_at: string | null
          moved_by: string | null
          notes: string | null
          previous_stage_id: string | null
          recruiter_id: string
          updated_at: string | null
        }
        Insert: {
          candidate_id: string
          created_at?: string | null
          current_stage_id: string
          id?: string
          job_posting_id?: string | null
          moved_at?: string | null
          moved_by?: string | null
          notes?: string | null
          previous_stage_id?: string | null
          recruiter_id: string
          updated_at?: string | null
        }
        Update: {
          candidate_id?: string
          created_at?: string | null
          current_stage_id?: string
          id?: string
          job_posting_id?: string | null
          moved_at?: string | null
          moved_by?: string | null
          notes?: string | null
          previous_stage_id?: string | null
          recruiter_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_pipeline_positions_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_current_stage_id_fkey"
            columns: ["current_stage_id"]
            isOneToOne: false
            referencedRelation: "pipeline_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_moved_by_fkey"
            columns: ["moved_by"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_moved_by_fkey"
            columns: ["moved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_moved_by_fkey"
            columns: ["moved_by"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_moved_by_fkey"
            columns: ["moved_by"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_moved_by_fkey"
            columns: ["moved_by"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_previous_stage_id_fkey"
            columns: ["previous_stage_id"]
            isOneToOne: false
            referencedRelation: "pipeline_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "candidate_pipeline_positions_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      education_verifications: {
        Row: {
          clearinghouse_id: string | null
          created_at: string | null
          degree_type: string
          field_of_study: string | null
          gpa: number | null
          graduation_date: string | null
          honors: string | null
          id: string
          institution_name: string
          profile_id: string
          updated_at: string | null
          verification_id: string | null
          verification_status: Database["public"]["Enums"]["verification_status"]
        }
        Insert: {
          clearinghouse_id?: string | null
          created_at?: string | null
          degree_type: string
          field_of_study?: string | null
          gpa?: number | null
          graduation_date?: string | null
          honors?: string | null
          id?: string
          institution_name: string
          profile_id: string
          updated_at?: string | null
          verification_id?: string | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Update: {
          clearinghouse_id?: string | null
          created_at?: string | null
          degree_type?: string
          field_of_study?: string | null
          gpa?: number | null
          graduation_date?: string | null
          honors?: string | null
          id?: string
          institution_name?: string
          profile_id?: string
          updated_at?: string | null
          verification_id?: string | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "education_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "education_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "education_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "education_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "education_verifications_verification_id_fkey"
            columns: ["verification_id"]
            isOneToOne: false
            referencedRelation: "government_verifications"
            referencedColumns: ["id"]
          },
        ]
      }
      employment_verifications: {
        Row: {
          created_at: string | null
          employer_name: string
          employment_type: string | null
          end_date: string | null
          id: string
          job_title: string
          profile_id: string
          salary_verified: boolean | null
          start_date: string
          updated_at: string | null
          verification_id: string | null
          verification_method: string | null
          verification_status: Database["public"]["Enums"]["verification_status"]
        }
        Insert: {
          created_at?: string | null
          employer_name: string
          employment_type?: string | null
          end_date?: string | null
          id?: string
          job_title: string
          profile_id: string
          salary_verified?: boolean | null
          start_date: string
          updated_at?: string | null
          verification_id?: string | null
          verification_method?: string | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Update: {
          created_at?: string | null
          employer_name?: string
          employment_type?: string | null
          end_date?: string | null
          id?: string
          job_title?: string
          profile_id?: string
          salary_verified?: boolean | null
          start_date?: string
          updated_at?: string | null
          verification_id?: string | null
          verification_method?: string | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "employment_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "employment_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employment_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "employment_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "employment_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "employment_verifications_verification_id_fkey"
            columns: ["verification_id"]
            isOneToOne: false
            referencedRelation: "government_verifications"
            referencedColumns: ["id"]
          },
        ]
      }
      government_verifications: {
        Row: {
          agency: Database["public"]["Enums"]["government_agency"]
          created_at: string | null
          expiry_date: string | null
          id: string
          metadata: Json | null
          profile_id: string
          status: Database["public"]["Enums"]["verification_status"]
          updated_at: string | null
          verification_date: string | null
          verification_id: string
          verification_score: number | null
          verification_type: Database["public"]["Enums"]["verification_type"]
          verified_data: Json | null
        }
        Insert: {
          agency: Database["public"]["Enums"]["government_agency"]
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          metadata?: Json | null
          profile_id: string
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string | null
          verification_date?: string | null
          verification_id: string
          verification_score?: number | null
          verification_type: Database["public"]["Enums"]["verification_type"]
          verified_data?: Json | null
        }
        Update: {
          agency?: Database["public"]["Enums"]["government_agency"]
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          metadata?: Json | null
          profile_id?: string
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string | null
          verification_date?: string | null
          verification_id?: string
          verification_score?: number | null
          verification_type?: Database["public"]["Enums"]["verification_type"]
          verified_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "government_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "government_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "government_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "government_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "government_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      interview_participants: {
        Row: {
          created_at: string
          id: string
          interview_id: string
          participant_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          interview_id: string
          participant_id: string
        }
        Update: {
          created_at?: string
          id?: string
          interview_id?: string
          participant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_participants_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "interview_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "interview_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "interview_participants_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      interviews: {
        Row: {
          candidate_email: string
          candidate_name: string
          created_at: string | null
          duration_minutes: number
          id: string
          interview_type: Database["public"]["Enums"]["interview_type"]
          location: string | null
          meeting_id: string | null
          meeting_url: string | null
          notes: string | null
          recruiter_id: string
          scheduled_at: string
          status: Database["public"]["Enums"]["interview_status"]
          timezone: string
          updated_at: string | null
        }
        Insert: {
          candidate_email: string
          candidate_name: string
          created_at?: string | null
          duration_minutes?: number
          id?: string
          interview_type: Database["public"]["Enums"]["interview_type"]
          location?: string | null
          meeting_id?: string | null
          meeting_url?: string | null
          notes?: string | null
          recruiter_id: string
          scheduled_at: string
          status?: Database["public"]["Enums"]["interview_status"]
          timezone?: string
          updated_at?: string | null
        }
        Update: {
          candidate_email?: string
          candidate_name?: string
          created_at?: string | null
          duration_minutes?: number
          id?: string
          interview_type?: Database["public"]["Enums"]["interview_type"]
          location?: string | null
          meeting_id?: string | null
          meeting_url?: string | null
          notes?: string | null
          recruiter_id?: string
          scheduled_at?: string
          status?: Database["public"]["Enums"]["interview_status"]
          timezone?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interviews_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "interviews_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "interviews_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "interviews_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      job_postings: {
        Row: {
          ai_analysis_score: Json | null
          company: string
          created_at: string | null
          description: string
          employment_type: string | null
          experience_level: string | null
          id: string
          location: string
          recruiter_id: string
          remote_allowed: boolean | null
          requirements: string[]
          salary_currency: string | null
          salary_max: number | null
          salary_min: number | null
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          ai_analysis_score?: Json | null
          company: string
          created_at?: string | null
          description: string
          employment_type?: string | null
          experience_level?: string | null
          id?: string
          location: string
          recruiter_id: string
          remote_allowed?: boolean | null
          requirements?: string[]
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          ai_analysis_score?: Json | null
          company?: string
          created_at?: string | null
          description?: string
          employment_type?: string | null
          experience_level?: string | null
          id?: string
          location?: string
          recruiter_id?: string
          remote_allowed?: boolean | null
          requirements?: string[]
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_postings_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "job_postings_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_postings_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "job_postings_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "job_postings_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      persona_analyses: {
        Row: {
          assessment_data: Json | null
          communication_style: string | null
          confidence_score: number | null
          created_at: string | null
          cultural_fit: Json
          emotional_intelligence: Json
          growth_areas: string[] | null
          id: string
          ideal_environment: string | null
          profile_id: string
          strengths: string[] | null
          updated_at: string | null
          work_style: Json
        }
        Insert: {
          assessment_data?: Json | null
          communication_style?: string | null
          confidence_score?: number | null
          created_at?: string | null
          cultural_fit?: Json
          emotional_intelligence?: Json
          growth_areas?: string[] | null
          id?: string
          ideal_environment?: string | null
          profile_id: string
          strengths?: string[] | null
          updated_at?: string | null
          work_style?: Json
        }
        Update: {
          assessment_data?: Json | null
          communication_style?: string | null
          confidence_score?: number | null
          created_at?: string | null
          cultural_fit?: Json
          emotional_intelligence?: Json
          growth_areas?: string[] | null
          id?: string
          ideal_environment?: string | null
          profile_id?: string
          strengths?: string[] | null
          updated_at?: string | null
          work_style?: Json
        }
        Relationships: [
          {
            foreignKeyName: "persona_analyses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "persona_analyses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persona_analyses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "persona_analyses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "persona_analyses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      pipeline_stages: {
        Row: {
          auto_email_template: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          recruiter_id: string
          stage_color: string | null
          stage_name: string
          stage_order: number
          updated_at: string | null
        }
        Insert: {
          auto_email_template?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          recruiter_id: string
          stage_color?: string | null
          stage_name: string
          stage_order: number
          updated_at?: string | null
        }
        Update: {
          auto_email_template?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          recruiter_id?: string
          stage_color?: string | null
          stage_name?: string
          stage_order?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_stages_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "pipeline_stages_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_stages_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "pipeline_stages_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "pipeline_stages_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      portfolio_settings: {
        Row: {
          allow_public_indexing: boolean | null
          candidate_id: string
          created_at: string | null
          include_reel_projects: boolean | null
          include_reel_skills: boolean | null
          link_expiration: string | null
          show_verification_badges: boolean | null
          track_analytics: boolean | null
          updated_at: string | null
        }
        Insert: {
          allow_public_indexing?: boolean | null
          candidate_id: string
          created_at?: string | null
          include_reel_projects?: boolean | null
          include_reel_skills?: boolean | null
          link_expiration?: string | null
          show_verification_badges?: boolean | null
          track_analytics?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allow_public_indexing?: boolean | null
          candidate_id?: string
          created_at?: string | null
          include_reel_projects?: boolean | null
          include_reel_skills?: boolean | null
          link_expiration?: string | null
          show_verification_badges?: boolean | null
          track_analytics?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_settings_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: true
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "portfolio_settings_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_settings_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: true
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "portfolio_settings_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: true
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "portfolio_settings_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: true
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      professional_licenses: {
        Row: {
          created_at: string | null
          expiry_date: string | null
          id: string
          issue_date: string | null
          issuing_authority: string
          license_number: string
          license_type: string
          profile_id: string
          state_code: string | null
          status: Database["public"]["Enums"]["verification_status"]
          updated_at: string | null
          verification_id: string | null
        }
        Insert: {
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority: string
          license_number: string
          license_type: string
          profile_id: string
          state_code?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string | null
          verification_id?: string | null
        }
        Update: {
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority?: string
          license_number?: string
          license_type?: string
          profile_id?: string
          state_code?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string | null
          verification_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "professional_licenses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "professional_licenses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "professional_licenses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "professional_licenses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "professional_licenses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "professional_licenses_verification_id_fkey"
            columns: ["verification_id"]
            isOneToOne: false
            referencedRelation: "government_verifications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          availability:
            | Database["public"]["Enums"]["availability_status"]
            | null
          avatar_url: string | null
          bee_status: Database["public"]["Enums"]["bee_level"] | null
          completion_score: number | null
          created_at: string | null
          email: string
          first_name: string
          headline: string | null
          id: string
          languages: Database["public"]["Enums"]["sa_language"][] | null
          last_name: string
          location: string | null
          preferred_roles: string[] | null
          province: Database["public"]["Enums"]["sa_province"] | null
          role: Database["public"]["Enums"]["user_role"]
          sa_id_number: string | null
          salary_currency: string | null
          salary_max: number | null
          salary_min: number | null
          summary: string | null
          tax_number: string | null
          updated_at: string | null
          user_id: string
          work_permit_status: string | null
        }
        Insert: {
          availability?:
            | Database["public"]["Enums"]["availability_status"]
            | null
          avatar_url?: string | null
          bee_status?: Database["public"]["Enums"]["bee_level"] | null
          completion_score?: number | null
          created_at?: string | null
          email: string
          first_name: string
          headline?: string | null
          id?: string
          languages?: Database["public"]["Enums"]["sa_language"][] | null
          last_name: string
          location?: string | null
          preferred_roles?: string[] | null
          province?: Database["public"]["Enums"]["sa_province"] | null
          role?: Database["public"]["Enums"]["user_role"]
          sa_id_number?: string | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          summary?: string | null
          tax_number?: string | null
          updated_at?: string | null
          user_id: string
          work_permit_status?: string | null
        }
        Update: {
          availability?:
            | Database["public"]["Enums"]["availability_status"]
            | null
          avatar_url?: string | null
          bee_status?: Database["public"]["Enums"]["bee_level"] | null
          completion_score?: number | null
          created_at?: string | null
          email?: string
          first_name?: string
          headline?: string | null
          id?: string
          languages?: Database["public"]["Enums"]["sa_language"][] | null
          last_name?: string
          location?: string | null
          preferred_roles?: string[] | null
          province?: Database["public"]["Enums"]["sa_province"] | null
          role?: Database["public"]["Enums"]["user_role"]
          sa_id_number?: string | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          summary?: string | null
          tax_number?: string | null
          updated_at?: string | null
          user_id?: string
          work_permit_status?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          description: string
          end_date: string | null
          featured: boolean | null
          github_url: string | null
          id: string
          impact: string | null
          live_url: string | null
          media_urls: string[] | null
          profile_id: string
          role: string
          start_date: string
          technologies: string[]
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          end_date?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          impact?: string | null
          live_url?: string | null
          media_urls?: string[] | null
          profile_id: string
          role: string
          start_date: string
          technologies?: string[]
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          end_date?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          impact?: string | null
          live_url?: string | null
          media_urls?: string[] | null
          profile_id?: string
          role?: string
          start_date?: string
          technologies?: string[]
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "projects_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "projects_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "projects_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      public_cv_links: {
        Row: {
          candidate_id: string
          created_at: string
          expires_at: string
          id: string
          revoked: boolean
          slug: string
        }
        Insert: {
          candidate_id: string
          created_at?: string
          expires_at?: string
          id?: string
          revoked?: boolean
          slug: string
        }
        Update: {
          candidate_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          revoked?: boolean
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_cv_links_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "public_cv_links_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cv_links_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "public_cv_links_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "public_cv_links_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      recruiter_scorecards: {
        Row: {
          candidate_id: string
          communication_rating: number
          company_name: string | null
          created_at: string | null
          feedback_text: string | null
          id: string
          is_public: boolean | null
          job_title: string | null
          overall_rating: number | null
          professionalism_rating: number
          recruiter_id: string
          role_accuracy_rating: number
          updated_at: string | null
        }
        Insert: {
          candidate_id: string
          communication_rating: number
          company_name?: string | null
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          is_public?: boolean | null
          job_title?: string | null
          overall_rating?: number | null
          professionalism_rating: number
          recruiter_id: string
          role_accuracy_rating: number
          updated_at?: string | null
        }
        Update: {
          candidate_id?: string
          communication_rating?: number
          company_name?: string | null
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          is_public?: boolean | null
          job_title?: string | null
          overall_rating?: number | null
          professionalism_rating?: number
          recruiter_id?: string
          role_accuracy_rating?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recruiter_scorecards_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "recruiter_scorecards_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_scorecards_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "recruiter_scorecards_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "recruiter_scorecards_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "recruiter_scorecards_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "recruiter_scorecards_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_scorecards_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "recruiter_scorecards_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "recruiter_scorecards_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string | null
          feedback: string
          id: string
          profile_id: string
          rating: number
          relationship: Database["public"]["Enums"]["review_relationship"]
          reviewer_id: string | null
          reviewer_name: string
          reviewer_role: string
          skills_mentioned: string[] | null
          verification_token: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          feedback: string
          id?: string
          profile_id: string
          rating: number
          relationship: Database["public"]["Enums"]["review_relationship"]
          reviewer_id?: string | null
          reviewer_name: string
          reviewer_role: string
          skills_mentioned?: string[] | null
          verification_token?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          feedback?: string
          id?: string
          profile_id?: string
          rating?: number
          relationship?: Database["public"]["Enums"]["review_relationship"]
          reviewer_id?: string | null
          reviewer_name?: string
          reviewer_role?: string
          skills_mentioned?: string[] | null
          verification_token?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      sa_bee_verifications: {
        Row: {
          bee_level: Database["public"]["Enums"]["bee_level"]
          certificate_number: string | null
          created_at: string | null
          enterprise_development_score: number | null
          expiry_date: string | null
          id: string
          issue_date: string | null
          management_score: number | null
          ownership_score: number | null
          profile_id: string
          skills_development_score: number | null
          socioeconomic_development_score: number | null
          total_score: number | null
          updated_at: string | null
          verification_agency: string
          verification_status: Database["public"]["Enums"]["sa_verification_status"]
        }
        Insert: {
          bee_level: Database["public"]["Enums"]["bee_level"]
          certificate_number?: string | null
          created_at?: string | null
          enterprise_development_score?: number | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          management_score?: number | null
          ownership_score?: number | null
          profile_id: string
          skills_development_score?: number | null
          socioeconomic_development_score?: number | null
          total_score?: number | null
          updated_at?: string | null
          verification_agency: string
          verification_status?: Database["public"]["Enums"]["sa_verification_status"]
        }
        Update: {
          bee_level?: Database["public"]["Enums"]["bee_level"]
          certificate_number?: string | null
          created_at?: string | null
          enterprise_development_score?: number | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          management_score?: number | null
          ownership_score?: number | null
          profile_id?: string
          skills_development_score?: number | null
          socioeconomic_development_score?: number | null
          total_score?: number | null
          updated_at?: string | null
          verification_agency?: string
          verification_status?: Database["public"]["Enums"]["sa_verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "sa_bee_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "sa_bee_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sa_bee_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "sa_bee_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "sa_bee_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      sa_education_verifications: {
        Row: {
          completion_date: string | null
          created_at: string | null
          id: string
          institution_name: string
          institution_verified: boolean | null
          nqf_level: number | null
          profile_id: string
          qualification_title: string
          qualification_type: string | null
          saqa_id: string | null
          saqa_verified: boolean | null
          updated_at: string | null
          verification_reference: string | null
          verification_status: Database["public"]["Enums"]["sa_verification_status"]
        }
        Insert: {
          completion_date?: string | null
          created_at?: string | null
          id?: string
          institution_name: string
          institution_verified?: boolean | null
          nqf_level?: number | null
          profile_id: string
          qualification_title: string
          qualification_type?: string | null
          saqa_id?: string | null
          saqa_verified?: boolean | null
          updated_at?: string | null
          verification_reference?: string | null
          verification_status?: Database["public"]["Enums"]["sa_verification_status"]
        }
        Update: {
          completion_date?: string | null
          created_at?: string | null
          id?: string
          institution_name?: string
          institution_verified?: boolean | null
          nqf_level?: number | null
          profile_id?: string
          qualification_title?: string
          qualification_type?: string | null
          saqa_id?: string | null
          saqa_verified?: boolean | null
          updated_at?: string | null
          verification_reference?: string | null
          verification_status?: Database["public"]["Enums"]["sa_verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "sa_education_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "sa_education_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sa_education_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "sa_education_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "sa_education_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      sa_employment_verifications: {
        Row: {
          created_at: string | null
          dol_reference: string | null
          employer_name: string
          employer_registration_number: string | null
          employment_end_date: string | null
          employment_start_date: string
          employment_type: string | null
          id: string
          job_title: string
          profile_id: string
          salary_verified: boolean | null
          sars_reference: string | null
          tax_certificate_verified: boolean | null
          uif_contributions_verified: boolean | null
          updated_at: string | null
          verification_status: Database["public"]["Enums"]["sa_verification_status"]
        }
        Insert: {
          created_at?: string | null
          dol_reference?: string | null
          employer_name: string
          employer_registration_number?: string | null
          employment_end_date?: string | null
          employment_start_date: string
          employment_type?: string | null
          id?: string
          job_title: string
          profile_id: string
          salary_verified?: boolean | null
          sars_reference?: string | null
          tax_certificate_verified?: boolean | null
          uif_contributions_verified?: boolean | null
          updated_at?: string | null
          verification_status?: Database["public"]["Enums"]["sa_verification_status"]
        }
        Update: {
          created_at?: string | null
          dol_reference?: string | null
          employer_name?: string
          employer_registration_number?: string | null
          employment_end_date?: string | null
          employment_start_date?: string
          employment_type?: string | null
          id?: string
          job_title?: string
          profile_id?: string
          salary_verified?: boolean | null
          sars_reference?: string | null
          tax_certificate_verified?: boolean | null
          uif_contributions_verified?: boolean | null
          updated_at?: string | null
          verification_status?: Database["public"]["Enums"]["sa_verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "sa_employment_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "sa_employment_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sa_employment_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "sa_employment_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "sa_employment_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      sa_government_verifications: {
        Row: {
          agency: Database["public"]["Enums"]["sa_government_agency"]
          created_at: string | null
          expiry_date: string | null
          id: string
          metadata: Json | null
          profile_id: string
          status: Database["public"]["Enums"]["sa_verification_status"]
          updated_at: string | null
          verification_date: string | null
          verification_id: string
          verification_score: number | null
          verification_type: Database["public"]["Enums"]["sa_verification_type"]
          verified_data: Json | null
        }
        Insert: {
          agency: Database["public"]["Enums"]["sa_government_agency"]
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          metadata?: Json | null
          profile_id: string
          status?: Database["public"]["Enums"]["sa_verification_status"]
          updated_at?: string | null
          verification_date?: string | null
          verification_id: string
          verification_score?: number | null
          verification_type: Database["public"]["Enums"]["sa_verification_type"]
          verified_data?: Json | null
        }
        Update: {
          agency?: Database["public"]["Enums"]["sa_government_agency"]
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          metadata?: Json | null
          profile_id?: string
          status?: Database["public"]["Enums"]["sa_verification_status"]
          updated_at?: string | null
          verification_date?: string | null
          verification_id?: string
          verification_score?: number | null
          verification_type?: Database["public"]["Enums"]["sa_verification_type"]
          verified_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "sa_government_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "sa_government_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sa_government_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "sa_government_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "sa_government_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      sa_identity_verifications: {
        Row: {
          biometric_verified: boolean | null
          created_at: string | null
          home_affairs_verified: boolean | null
          id: string
          id_number: string
          id_type: string
          profile_id: string
          updated_at: string | null
          verification_date: string | null
          verification_reference: string | null
          verification_status: Database["public"]["Enums"]["sa_verification_status"]
        }
        Insert: {
          biometric_verified?: boolean | null
          created_at?: string | null
          home_affairs_verified?: boolean | null
          id?: string
          id_number: string
          id_type?: string
          profile_id: string
          updated_at?: string | null
          verification_date?: string | null
          verification_reference?: string | null
          verification_status?: Database["public"]["Enums"]["sa_verification_status"]
        }
        Update: {
          biometric_verified?: boolean | null
          created_at?: string | null
          home_affairs_verified?: boolean | null
          id?: string
          id_number?: string
          id_type?: string
          profile_id?: string
          updated_at?: string | null
          verification_date?: string | null
          verification_reference?: string | null
          verification_status?: Database["public"]["Enums"]["sa_verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "sa_identity_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "sa_identity_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sa_identity_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "sa_identity_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "sa_identity_verifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      sa_professional_licenses: {
        Row: {
          cpd_compliant: boolean | null
          created_at: string | null
          expiry_date: string | null
          id: string
          issue_date: string | null
          license_number: string
          license_type: string
          professional_body: string
          profile_id: string
          registration_category: string | null
          status: Database["public"]["Enums"]["sa_verification_status"]
          updated_at: string | null
          verification_reference: string | null
        }
        Insert: {
          cpd_compliant?: boolean | null
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          license_number: string
          license_type: string
          professional_body: string
          profile_id: string
          registration_category?: string | null
          status?: Database["public"]["Enums"]["sa_verification_status"]
          updated_at?: string | null
          verification_reference?: string | null
        }
        Update: {
          cpd_compliant?: boolean | null
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          license_number?: string
          license_type?: string
          professional_body?: string
          profile_id?: string
          registration_category?: string | null
          status?: Database["public"]["Enums"]["sa_verification_status"]
          updated_at?: string | null
          verification_reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sa_professional_licenses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "sa_professional_licenses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sa_professional_licenses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "sa_professional_licenses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "sa_professional_licenses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      sa_seta_certifications: {
        Row: {
          certificate_number: string | null
          completion_date: string | null
          created_at: string | null
          credits_achieved: number | null
          id: string
          profile_id: string
          qualification_title: string
          seta_name: string
          seta_verified: boolean | null
          unit_standards: string[] | null
          updated_at: string | null
          verification_status: Database["public"]["Enums"]["sa_verification_status"]
        }
        Insert: {
          certificate_number?: string | null
          completion_date?: string | null
          created_at?: string | null
          credits_achieved?: number | null
          id?: string
          profile_id: string
          qualification_title: string
          seta_name: string
          seta_verified?: boolean | null
          unit_standards?: string[] | null
          updated_at?: string | null
          verification_status?: Database["public"]["Enums"]["sa_verification_status"]
        }
        Update: {
          certificate_number?: string | null
          completion_date?: string | null
          created_at?: string | null
          credits_achieved?: number | null
          id?: string
          profile_id?: string
          qualification_title?: string
          seta_name?: string
          seta_verified?: boolean | null
          unit_standards?: string[] | null
          updated_at?: string | null
          verification_status?: Database["public"]["Enums"]["sa_verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "sa_seta_certifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "sa_seta_certifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sa_seta_certifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "sa_seta_certifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "sa_seta_certifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      skill_competency_frameworks: {
        Row: {
          category: string
          created_at: string | null
          framework_data: Json
          id: string
          industry_context: string | null
          is_active: boolean | null
          skill_name: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          framework_data: Json
          id?: string
          industry_context?: string | null
          is_active?: boolean | null
          skill_name: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          framework_data?: Json
          id?: string
          industry_context?: string | null
          is_active?: boolean | null
          skill_name?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      skill_video_verifications: {
        Row: {
          ai_feedback: string | null
          ai_prompt: string
          ai_rating: number | null
          created_at: string | null
          id: string
          skill_id: string | null
          updated_at: string | null
          verification_status: string | null
          video_url: string
        }
        Insert: {
          ai_feedback?: string | null
          ai_prompt: string
          ai_rating?: number | null
          created_at?: string | null
          id?: string
          skill_id?: string | null
          updated_at?: string | null
          verification_status?: string | null
          video_url: string
        }
        Update: {
          ai_feedback?: string | null
          ai_prompt?: string
          ai_rating?: number | null
          created_at?: string | null
          id?: string
          skill_id?: string | null
          updated_at?: string | null
          verification_status?: string | null
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_video_verifications_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skill_videos"
            referencedColumns: ["skill_id"]
          },
          {
            foreignKeyName: "skill_video_verifications_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          ai_feedback: string | null
          ai_rating: number | null
          category: Database["public"]["Enums"]["skill_category"]
          created_at: string | null
          description: string | null
          endorsements: number | null
          id: string
          name: string
          proficiency: Database["public"]["Enums"]["proficiency_level"]
          profile_id: string
          storage_path: string | null
          updated_at: string | null
          verified: boolean | null
          video_demo_url: string | null
          video_duration: number | null
          video_file_size: number | null
          video_uploaded_at: string | null
          video_verified: boolean | null
          years_experience: number
        }
        Insert: {
          ai_feedback?: string | null
          ai_rating?: number | null
          category: Database["public"]["Enums"]["skill_category"]
          created_at?: string | null
          description?: string | null
          endorsements?: number | null
          id?: string
          name: string
          proficiency: Database["public"]["Enums"]["proficiency_level"]
          profile_id: string
          storage_path?: string | null
          updated_at?: string | null
          verified?: boolean | null
          video_demo_url?: string | null
          video_duration?: number | null
          video_file_size?: number | null
          video_uploaded_at?: string | null
          video_verified?: boolean | null
          years_experience?: number
        }
        Update: {
          ai_feedback?: string | null
          ai_rating?: number | null
          category?: Database["public"]["Enums"]["skill_category"]
          created_at?: string | null
          description?: string | null
          endorsements?: number | null
          id?: string
          name?: string
          proficiency?: Database["public"]["Enums"]["proficiency_level"]
          profile_id?: string
          storage_path?: string | null
          updated_at?: string | null
          verified?: boolean | null
          video_demo_url?: string | null
          video_duration?: number | null
          video_file_size?: number | null
          video_uploaded_at?: string | null
          video_verified?: boolean | null
          years_experience?: number
        }
        Relationships: [
          {
            foreignKeyName: "skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      system_logs: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          invalidated_at: string | null
          ip_address: string | null
          is_active: boolean | null
          last_activity: string | null
          security_flags: Json | null
          session_id: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          invalidated_at?: string | null
          ip_address?: string | null
          is_active?: boolean | null
          last_activity?: string | null
          security_flags?: Json | null
          session_id?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          invalidated_at?: string | null
          ip_address?: string | null
          is_active?: boolean | null
          last_activity?: string | null
          security_flags?: Json | null
          session_id?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      verification_requests: {
        Row: {
          agency: Database["public"]["Enums"]["government_agency"]
          callback_url: string | null
          completed_at: string | null
          created_at: string | null
          error_details: Json | null
          external_request_id: string | null
          id: string
          last_attempt_at: string | null
          max_retries: number | null
          profile_id: string
          request_data: Json
          retry_count: number | null
          status: Database["public"]["Enums"]["verification_status"]
          updated_at: string | null
          verification_type: Database["public"]["Enums"]["verification_type"]
        }
        Insert: {
          agency: Database["public"]["Enums"]["government_agency"]
          callback_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          error_details?: Json | null
          external_request_id?: string | null
          id?: string
          last_attempt_at?: string | null
          max_retries?: number | null
          profile_id: string
          request_data: Json
          retry_count?: number | null
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string | null
          verification_type: Database["public"]["Enums"]["verification_type"]
        }
        Update: {
          agency?: Database["public"]["Enums"]["government_agency"]
          callback_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          error_details?: Json | null
          external_request_id?: string | null
          id?: string
          last_attempt_at?: string | null
          max_retries?: number | null
          profile_id?: string
          request_data?: Json
          retry_count?: number | null
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string | null
          verification_type?: Database["public"]["Enums"]["verification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "verification_requests_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "live_candidate_availability"
            referencedColumns: ["candidate_id"]
          },
          {
            foreignKeyName: "verification_requests_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verification_requests_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "recruiter_ratings_summary"
            referencedColumns: ["recruiter_id"]
          },
          {
            foreignKeyName: "verification_requests_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "reelpass_status"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "verification_requests_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "sa_reelpass_status"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      video_analyses: {
        Row: {
          analysis_data: Json
          candidate_id: string
          confidence_scores: Json | null
          created_at: string | null
          error_message: string | null
          id: string
          processing_completed_at: string | null
          processing_started_at: string | null
          processing_status: string | null
          skills_detected: Json | null
          traits_assessment: Json | null
          updated_at: string | null
          video_id: string
        }
        Insert: {
          analysis_data: Json
          candidate_id: string
          confidence_scores?: Json | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          processing_completed_at?: string | null
          processing_started_at?: string | null
          processing_status?: string | null
          skills_detected?: Json | null
          traits_assessment?: Json | null
          updated_at?: string | null
          video_id: string
        }
        Update: {
          analysis_data?: Json
          candidate_id?: string
          confidence_scores?: Json | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          processing_completed_at?: string | null
          processing_started_at?: string | null
          processing_status?: string | null
          skills_detected?: Json | null
          traits_assessment?: Json | null
          updated_at?: string | null
          video_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      live_candidate_availability: {
        Row: {
          availability_status:
            | Database["public"]["Enums"]["availability_status"]
            | null
          availability_updated_at: string | null
          available_from: string | null
          candidate_id: string | null
          email: string | null
          first_name: string | null
          headline: string | null
          last_name: string | null
          location_preferences: string[] | null
          notice_period_days: number | null
          preferred_work_type: string | null
          reelpass_score: number | null
          salary_expectation_max: number | null
          salary_expectation_min: number | null
          verification_status: string | null
        }
        Relationships: []
      }
      recruiter_ratings_summary: {
        Row: {
          avg_communication: number | null
          avg_professionalism: number | null
          avg_role_accuracy: number | null
          email: string | null
          first_name: string | null
          last_name: string | null
          negative_reviews: number | null
          overall_rating: number | null
          positive_reviews: number | null
          recruiter_id: string | null
          total_reviews: number | null
        }
        Relationships: []
      }
      reelpass_status: {
        Row: {
          email: string | null
          first_name: string | null
          last_name: string | null
          profile_id: string | null
          reelpass_score: number | null
          reelpass_status: string | null
          user_id: string | null
          verified_education_count: number | null
          verified_employment_count: number | null
          verified_government_checks: number | null
          verified_license_count: number | null
          verified_skill_count: number | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          profile_id?: string | null
          reelpass_score?: never
          reelpass_status?: never
          user_id?: string | null
          verified_education_count?: never
          verified_employment_count?: never
          verified_government_checks?: never
          verified_license_count?: never
          verified_skill_count?: never
        }
        Update: {
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          profile_id?: string | null
          reelpass_score?: never
          reelpass_status?: never
          user_id?: string | null
          verified_education_count?: never
          verified_employment_count?: never
          verified_government_checks?: never
          verified_license_count?: never
          verified_skill_count?: never
        }
        Relationships: []
      }
      sa_reelpass_status: {
        Row: {
          bee_status: Database["public"]["Enums"]["bee_level"] | null
          email: string | null
          first_name: string | null
          last_name: string | null
          persona_assessed: boolean | null
          persona_confidence_score: number | null
          profile_id: string | null
          province: Database["public"]["Enums"]["sa_province"] | null
          reelpass_score: number | null
          reelpass_status: string | null
          user_id: string | null
          verified_bee_count: number | null
          verified_education_count: number | null
          verified_employment_count: number | null
          verified_identity_checks: number | null
          verified_license_count: number | null
          verified_seta_count: number | null
          verified_skill_count: number | null
          video_verified_skills: number | null
        }
        Relationships: []
      }
      skill_videos: {
        Row: {
          first_name: string | null
          last_name: string | null
          skill_id: string | null
          skill_name: string | null
          storage_path: string | null
          user_id: string | null
          video_demo_url: string | null
          video_duration: number | null
          video_file_size: number | null
          video_uploaded_at: string | null
          video_verified: boolean | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_completion_score: {
        Args: { profile_uuid: string }
        Returns: number
      }
      calculate_reelpass_score: {
        Args: { candidate_profile_id: string }
        Returns: number
      }
      calculate_sa_reelpass_score: {
        Args: { candidate_profile_id: string }
        Returns: number
      }
      check_session_security: {
        Args: {
          p_user_id: string
          p_session_id?: string
          p_user_agent?: string
        }
        Returns: {
          is_valid: boolean
          session_data: Json
          security_warnings: string[]
        }[]
      }
      cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      generate_skill_video_path: {
        Args: { skill_id: string; file_extension: string }
        Returns: string
      }
      get_my_apps: {
        Args: Record<PropertyKey, never>
        Returns: {
          app_id: string
          app_name: string
          app_description: string
          app_url: string
        }[]
      }
      get_sa_reelpass_breakdown: {
        Args: { candidate_profile_id: string }
        Returns: Json
      }
      get_user_apps: {
        Args: { user_id: string }
        Returns: {
          app_id: string
          app_name: string
          app_description: string
          app_url: string
        }[]
      }
      get_user_profile_safe: {
        Args: { user_id_param: string }
        Returns: {
          id: string
          user_id: string
          email: string
          role: Database["public"]["Enums"]["user_role"]
          first_name: string
          last_name: string
        }[]
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      log_app_access: {
        Args: { app_id: string }
        Returns: undefined
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      skill_video_is_verified: {
        Args: { skill_id: string }
        Returns: boolean
      }
      user_owns_skill: {
        Args: { skill_id: string; user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      availability_status: "available" | "open" | "not-looking"
      bee_level:
        | "level_1"
        | "level_2"
        | "level_3"
        | "level_4"
        | "level_5"
        | "level_6"
        | "level_7"
        | "level_8"
        | "non_compliant"
      government_agency:
        | "ssa"
        | "dhs"
        | "dol"
        | "education"
        | "state_licensing"
        | "irs"
      interview_status: "scheduled" | "completed" | "cancelled" | "rescheduled"
      interview_type: "video" | "phone" | "in-person"
      job_status: "draft" | "active" | "paused" | "closed"
      proficiency_level:
        | "beginner"
        | "intermediate"
        | "advanced"
        | "expert"
        | "master"
      review_relationship:
        | "colleague"
        | "manager"
        | "client"
        | "mentor"
        | "direct_report"
      sa_government_agency:
        | "home_affairs"
        | "sars"
        | "saps"
        | "saqa"
        | "department_labour"
        | "department_education"
        | "professional_councils"
        | "seta_bodies"
        | "bee_verification_agencies"
      sa_language:
        | "afrikaans"
        | "english"
        | "ndebele"
        | "northern_sotho"
        | "sotho"
        | "swazi"
        | "tsonga"
        | "tswana"
        | "venda"
        | "xhosa"
        | "zulu"
      sa_province:
        | "eastern_cape"
        | "free_state"
        | "gauteng"
        | "kwazulu_natal"
        | "limpopo"
        | "mpumalanga"
        | "northern_cape"
        | "north_west"
        | "western_cape"
      sa_verification_status:
        | "pending"
        | "verified"
        | "failed"
        | "expired"
        | "revoked"
      sa_verification_type:
        | "id_verification"
        | "tax_clearance"
        | "criminal_record"
        | "credit_check"
        | "education_saqa"
        | "professional_registration"
        | "seta_certification"
        | "bee_certificate"
      skill_category: "technical" | "soft" | "language" | "certification"
      user_role: "candidate" | "recruiter" | "admin"
      verification_status:
        | "pending"
        | "verified"
        | "failed"
        | "expired"
        | "revoked"
      verification_type:
        | "identity"
        | "education"
        | "employment"
        | "license"
        | "security_clearance"
        | "background_check"
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
    Enums: {
      availability_status: ["available", "open", "not-looking"],
      bee_level: [
        "level_1",
        "level_2",
        "level_3",
        "level_4",
        "level_5",
        "level_6",
        "level_7",
        "level_8",
        "non_compliant",
      ],
      government_agency: [
        "ssa",
        "dhs",
        "dol",
        "education",
        "state_licensing",
        "irs",
      ],
      interview_status: ["scheduled", "completed", "cancelled", "rescheduled"],
      interview_type: ["video", "phone", "in-person"],
      job_status: ["draft", "active", "paused", "closed"],
      proficiency_level: [
        "beginner",
        "intermediate",
        "advanced",
        "expert",
        "master",
      ],
      review_relationship: [
        "colleague",
        "manager",
        "client",
        "mentor",
        "direct_report",
      ],
      sa_government_agency: [
        "home_affairs",
        "sars",
        "saps",
        "saqa",
        "department_labour",
        "department_education",
        "professional_councils",
        "seta_bodies",
        "bee_verification_agencies",
      ],
      sa_language: [
        "afrikaans",
        "english",
        "ndebele",
        "northern_sotho",
        "sotho",
        "swazi",
        "tsonga",
        "tswana",
        "venda",
        "xhosa",
        "zulu",
      ],
      sa_province: [
        "eastern_cape",
        "free_state",
        "gauteng",
        "kwazulu_natal",
        "limpopo",
        "mpumalanga",
        "northern_cape",
        "north_west",
        "western_cape",
      ],
      sa_verification_status: [
        "pending",
        "verified",
        "failed",
        "expired",
        "revoked",
      ],
      sa_verification_type: [
        "id_verification",
        "tax_clearance",
        "criminal_record",
        "credit_check",
        "education_saqa",
        "professional_registration",
        "seta_certification",
        "bee_certificate",
      ],
      skill_category: ["technical", "soft", "language", "certification"],
      user_role: ["candidate", "recruiter", "admin"],
      verification_status: [
        "pending",
        "verified",
        "failed",
        "expired",
        "revoked",
      ],
      verification_type: [
        "identity",
        "education",
        "employment",
        "license",
        "security_clearance",
        "background_check",
      ],
    },
  },
} as const
