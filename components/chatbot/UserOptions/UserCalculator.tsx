'use client'

import React, { useState } from 'react'

type Props = {}

const UserCalculator = (props: Props) => {
  const [formData, setFormData] = useState({
    sex: '',
    height: '',
    weight: '',
    age: '',
    outExerc: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  return (
    <div className='w-full p-4'>
      <h2>Calculadora</h2>
      <form id='calcTDEE' onSubmit={handleSubmit} className="flex flex-col gap-4 py-4 w-full rounded-lg">
        <h3 className='font-bold text-[1.2em]'>Calcule seu gasto calórico diário (TDEE)</h3>
        <fieldset>
          <div className="flex gap-2 w-full justify-between pr-2">
            <legend className="font-semibold">Sexo:</legend>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="sex"
                value="male"
                checked={formData.sex === 'male'}
                onChange={handleChange}
              />
              Masculino
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="sex"
                value="female"
                checked={formData.sex === 'female'}
                onChange={handleChange}
              />
              Feminino
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="sex"
                value="other"
                checked={formData.sex === 'other'}
                onChange={handleChange}
              />
              Outro
            </label>
          </div>
        </fieldset>
        <div className='flex gap-3 justify-between'>
          <label className='flex-1'>
            <legend className="font-semibold text-nowrap">Altura (cm):</legend>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="ex: 175"
              min="0"
              max="270"
            />
          </label>

          <label className='flex-1'>
            <legend className="font-semibold text-nowrap">Peso (kg):</legend>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="ex: 70"
              min="0"
            />
          </label>

          <label className='flex-1'>
            <legend className="font-semibold text-nowrap">Idade (anos):</legend>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="ex: 25"
              min="0"
              max="120"
            />
          </label>
        </div>

        <label>
          <p className='font-semibold'>Como você descreveria seu nível de atividade (fora da academia) ?</p>
          <select name="outExerc" value={formData.outExerc} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Selecione</option>
            <option value="Sedentário">Sedentário</option>
            <option value="Moderadamente">Moderadamente ativo</option>
            <option value="ativo">Bastante ativo</option>
          </select>
        </label>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          Enviar
        </button>
      </form>
    </div>
  )
}



export default UserCalculator