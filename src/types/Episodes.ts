export interface Episodes {
  name: string;
  id: number;
  episode_number: number;
  air_date?: string;
  still_path: string;
  season?: string;
}

export interface ReleaseSchedule {
  [key: string]: Episodes[];
}
