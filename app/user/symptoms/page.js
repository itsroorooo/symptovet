"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { supabase } from "../dashboard/supabaseClient";

export default function SymptomsList({ onSubmit = () => {} }) {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [symptomToEquipment, setSymptomToEquipment] = useState({});

  useEffect(() => {
    const fetchSymptomsAndEquipment = async () => {
      const { data: symptomsData, error: symptomsError } = await supabase
        .from("symptoms")
        .select("id, name, description");

      if (symptomsError) {
        console.error("Error fetching symptoms:", symptomsError);
        return;
      }

      setSymptoms(symptomsData);
      setSelectedSymptoms(Array(symptomsData.length).fill(false));

      const { data: symptomEquipmentData, error: equipmentError } = await supabase
        .from("symptom_equipment")
        .select("symptom_id, equipment (name)");

      if (equipmentError) {
        console.error("Error fetching symptom-equipment mapping:", equipmentError);
        return;
      }

      const mapping = {};
      symptomEquipmentData.forEach((item) => {
        const symptomId = item.symptom_id;
        const equipmentName = item.equipment.name;

        if (!mapping[symptomId]) {
          mapping[symptomId] = [];
        }
        mapping[symptomId].push(equipmentName);
      });

      setSymptomToEquipment(mapping);
    };

    fetchSymptomsAndEquipment();
  }, []);

  const toggleSymptom = (index) => {
    const updatedSymptoms = [...selectedSymptoms];
    updatedSymptoms[index] = !updatedSymptoms[index];
    setSelectedSymptoms(updatedSymptoms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = symptoms.filter((_, index) => selectedSymptoms[index]);

    let requiredEquipment = [];
    selected.forEach((symptom) => {
      const equipmentList = symptomToEquipment[symptom.id] || [];
      requiredEquipment = [...new Set([...requiredEquipment, ...equipmentList])];
    });

    console.log("Required Equipment:", requiredEquipment);
    onSubmit(requiredEquipment);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center transition-colors duration-300">
      {/* Reduced top padding and margin */}
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-6xl p-4 rounded-lg shadow-md transition-colors duration-300 mt-2">
        {/* Reduced margin-bottom for the heading */}
        <h1 className="text-2xl font-semibold text-center mb-2">SYMPTOMS LIST</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto max-h-[400px]">
          {symptoms.map((symptom, index) => (
            <div
              key={symptom.id}
              className="w-full border border-gray-300 p-3 rounded-full cursor-pointer flex items-center justify-between transition duration-200 hover:bg-gray-100"
              onClick={() => toggleSymptom(index)}
            >
              <span>{symptom.name}</span>
              {selectedSymptoms[index] ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <Circle className="text-gray-400" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label className="block font-semibold mb-1">Additional info:</label>
          <textarea
            className="w-full p-2 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300 text-gray-900 dark:text-gray-100"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}