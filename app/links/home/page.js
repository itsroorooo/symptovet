"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { supabase } from "../supabaseClinet";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 w-full max-w-lg p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-5">SYMPTOMS LIST</h1>
        
        {/* Symptoms List */}
        <div className="space-y-2 overflow-y-auto max-h-[400px]">
          {symptoms.map((symptom, index) => (
            <div
              key={symptom.id}
              className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg cursor-pointer flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700"
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

        {/* Additional Info */}
        <div className="mt-4">
          <label className="block font-semibold mb-1">Additional info:</label>
          <textarea
            className="w-full p-2 border dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            rows="3"
          />
        </div>

        {/* Submit Button */}
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
