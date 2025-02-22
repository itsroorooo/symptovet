"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { supabase } from "./supabaseClient";

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
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 w-full max-w-lg p-6 rounded-lg shadow-md transition-colors duration-300">
        <h1 className="text-2xl font-semibold text-center mb-5">SYMPTOMS LIST</h1>
        <div className="space-y-2 flex flex-col overflow-y-auto max-h-[400px]">
          {symptoms.map((symptom, index) => (
            <div
              key={symptom.id}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-full cursor-pointer flex items-center justify-between transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
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
            className="w-full p-2 border dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300 text-gray-900 dark:text-gray-100"
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
