export interface SlotAvailability {
  date: string;
  session: "morning" | "afternoon";
  startTime: string;
  endTime: string;
  capacity: number;
  remaining: number;
  full: boolean;
}

export interface AvailabilityResponse {
  date: string;
  slots: SlotAvailability[];
}
