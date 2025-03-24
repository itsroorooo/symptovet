"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../components/supabaseClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/App.css";
import PawPrint from "../../../components/user/PawPrint";

export default function ClinicBooking() {
  const { id } = useParams();
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pawStep, setPawStep] = useState(0);
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    animalType: "",
    breed: "",
  });

  useEffect(() => {
    console.log("Clinic ID from URL:", id);
    const fetchClinic = async () => {
      try {
        const { data, error } = await supabase
          .from("clinics")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setClinic(data);
      } catch (error) {
        console.error("Error fetching clinic:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchClinic();
  }, [id]);

  // Rest of the code...
}