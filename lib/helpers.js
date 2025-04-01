export function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  }
  
  export function generateTimeSlots(openHours, selectedDate, existingAppointments) {
    // Parse open hours (assuming format like "9:00 AM - 5:00 PM")
    const [openStr, closeStr] = openHours?.split(" - ") || ["9:00 AM", "5:00 PM"];
    
    const parseTime = (timeStr) => {
      const [time, period] = timeStr.split(" ");
      const [hours, minutes] = time.split(":");
      let hour = parseInt(hours, 10);
      if (period === "PM" && hour < 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;
      return [hour, parseInt(minutes, 10)];
    };
  
    const [openHour, openMinute] = parseTime(openStr);
    const [closeHour, closeMinute] = parseTime(closeStr);
  
    // Check if selected date is today
    const today = new Date();
    const isToday =
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear();
  
    // Get current time if it's today
    const currentHour = isToday ? today.getHours() : 0;
    const currentMinute = isToday ? today.getMinutes() : 0;
  
    // Generate 30-minute slots
    const slots = [];
    let hour = openHour;
    let minute = openMinute;
  
    while (hour < closeHour || (hour === closeHour && minute < closeMinute)) {
      // Skip if time is in the past for today
      if (!(isToday && (hour < currentHour || (hour === currentHour && minute < currentMinute)))) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        
        // Check if slot is already booked
        const isBooked = existingAppointments.some(
          (appt) =>
            appt.date === selectedDate.toISOString().split("T")[0] &&
            appt.time === timeString
        );
  
        if (!isBooked) {
          slots.push(timeString);
        }
      }
  
      // Increment time by 30 minutes
      minute += 30;
      if (minute >= 60) {
        hour += 1;
        minute -= 60;
      }
    }
  
    return slots;
  }