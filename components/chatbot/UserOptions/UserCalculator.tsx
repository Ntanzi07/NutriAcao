'use client'

import { Separator } from 'radix-ui';
import React, { useState } from 'react'

type Props = {}

const UserCalculator = (props: Props) => {
  const [form, setForm] = useState({
    sexo: "masculino",
    peso: "70",
    altura: "175",
    idade: "25",
    atividadeDiaria: 0,
    freqMusculacao: "3",
    duracaoMusculacao: "60",
    intensidadeMusculacao: 0,
    freqAerobico: "2",
    duracaoAerobico: "30",
    intensidadeAerobico: 0,
  });

  const [resultado, setResultado] = useState(0);
  const [TMB, setTMB] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const calcularTDEE = () => {
    const {
      sexo,
      peso,
      altura,
      idade,
      atividadeDiaria,
      freqMusculacao,
      duracaoMusculacao,
      intensidadeMusculacao,
      freqAerobico,
      duracaoAerobico,
      intensidadeAerobico,
    } = form;

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    const idadeNum = parseInt(idade);
    const freqMusculacaoNum = parseInt(freqMusculacao);
    const duracaoMusculacaoNum = parseInt(duracaoMusculacao);
    const freqAerobicoNum = parseInt(freqAerobico);
    const duracaoAerobicoNum = parseInt(duracaoAerobico);

    // TMB (Mifflin-St Jeor)
    setTMB(
      sexo === "masculino"
        ? 10 * pesoNum + 6.25 * alturaNum - 5 * idadeNum + 5
        : 10 * pesoNum + 6.25 * alturaNum - 5 * idadeNum - 161
    )

    // Multiplicador da atividade diária
    const fatoresAtividade = [
      1.2,    //sedentario
      1.35,   //moderado
      1.5,    //ativo
    ]

    const multAtividade = fatoresAtividade[atividadeDiaria];

    // Intensidade musculação
    const intensidadeMusculacaoMap = [
      5,    //leve
      7,    //moderada
      9,    //alta
    ]
    const kcalMusculacao =
      freqMusculacaoNum * duracaoMusculacaoNum * intensidadeMusculacaoMap[intensidadeMusculacao] * 0.1 * pesoNum / 7;

    // Intensidade aeróbico
    const intensidadeAerobicoMap = [
      4,    //leve
      7,    //moderada
      10,   //alta
    ]
    const kcalAerobico =
      freqAerobicoNum * duracaoAerobicoNum * intensidadeAerobicoMap[intensidadeAerobico] * 0.1 * pesoNum / 7;

    const TDEE = TMB * multAtividade + kcalMusculacao + kcalAerobico;

    setResultado(Number.parseFloat(TDEE.toFixed(2)));
  };

  return (
    <div className="mt-10 flex-1 px-10 flex flex-col overflow-y-auto overflow-hidden">
      <h1 className="text-[1.5em] font-bold">Calculadora de TDEE</h1>
      <Separator.Root
        className="h-[1px] w-auto bg-secondary-color"
        decorative
        orientation="horizontal"
      />

      <div className="flex flex-col gap-2 mt-3 text-[1.1em]">

        <h2 className='font-semibold text-[1.2em]'>Passo 1: Dados Pessoais</h2>

        <div className='flex flex-col gap-2 px-3 rounded-lg'>
          <fieldset>
            <div className="flex gap-2 w-full">
              <legend className="font-semibold ">Sexo:</legend>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="sexo"
                  value="masculino"
                  checked={form.sexo === "masculino"}
                  onChange={handleChange}
                />
                Masculino
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="sexo"
                  value="feminino"
                  checked={form.sexo === "feminino"}
                  onChange={handleChange}
                />
                Feminino
              </label>
            </div>
          </fieldset>

          <div className='flex justify-between gap-5'>
            <label className='flex w-fit items-center gap-2'>
              <legend className="font-semibold ">Peso (kg):</legend>
              <input name="peso" min={0} max={400} type="number" value={form.peso} onChange={handleChange} className="w-[75px] bg-transparent border-b-2 border-black" />
            </label>
            <label className='flex items-center gap-2'>
              <legend className="font-semibold ">Altura (cm):</legend>
              <input name="altura" min={0} max={260} type="number" value={form.altura} onChange={handleChange} className="w-[75px] bg-transparent border-b-2 border-black" />
            </label>

            <label className='flex items-center gap-2'>
              <legend className="font-semibold ">Idade:</legend>
              <input name="idade" min={0} max={120} type="number" value={form.idade} onChange={handleChange} className="w-[75px] bg-transparent border-b-2 border-black" />
            </label>
          </div>
        </div>

        <h2 className='font-semibold text-[1.2em] mt-5'>Passo 2: Nível de Atividade e Musculação</h2>

        <div className='flex flex-col gap-3 px-3 rounded-lg'>
          <fieldset>
            <legend className="font-semibold">Atividade diária:</legend>
            <div className="flex gap-2 w-full justify-between pr-2">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="atividadeDiaria"
                  value={0}
                  checked={form.atividadeDiaria === 0}
                  onChange={(e) => setForm({ ...form, atividadeDiaria: Number(e.target.value) })}
                />
                Sedentário
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="atividadeDiaria"
                  value={1}
                  checked={form.atividadeDiaria === 1}
                  onChange={(e) => setForm({ ...form, atividadeDiaria: Number(e.target.value) })}
                />
                Moderadamente ativo
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="atividadeDiaria"
                  value={2}
                  checked={form.atividadeDiaria === 2}
                  onChange={(e) => setForm({ ...form, atividadeDiaria: Number(e.target.value) })}
                />
                Bastante ativo
              </label>
            </div>
          </fieldset>
          <label className='flex gap-3 justify-between'>
            <legend className=" text-wrap">Frequência de musculação (por semana):</legend>
            <input name="freqMusculacao" min={0} max={28} type="number" value={form.freqMusculacao} onChange={handleChange} className="w-[75px] bg-transparent border-b-2 border-black" />
          </label>

          <label className='flex gap-3 justify-between'>
            <legend className=" text-wrap">Duração média do treino de musculação (min):</legend>
            <input name="duracaoMusculacao" min={0} max={1000} type="number" value={form.duracaoMusculacao} onChange={handleChange} className="w-[75px] bg-transparent border-b-2 border-black" />
          </label>

          <fieldset>
            <div className="flex gap-2 w-full justify-between pr-2">
              <legend className="">Intensidade da musculação:</legend>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="intensidadeMusculacao"
                  value={0}
                  checked={form.intensidadeMusculacao === 0}
                  onChange={(e) => setForm({ ...form, intensidadeMusculacao: Number(e.target.value) })}
                />
                Leve
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="intensidadeMusculacao"
                  value={1}
                  checked={form.intensidadeMusculacao === 1}
                  onChange={(e) => setForm({ ...form, intensidadeMusculacao: Number(e.target.value) })}
                />
                Moderada
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="intensidadeMusculacao"
                  value={2}
                  checked={form.intensidadeMusculacao === 2}
                  onChange={(e) => setForm({ ...form, intensidadeMusculacao: Number(e.target.value) })}
                />
                Alta
              </label>
            </div>
          </fieldset>
        </div>

        <h2 className='font-semibold text-[1.2em] mt-5'>Passo 3: Exercícios Aeróbicos</h2>

        <div className='flex flex-col gap-3 px-3 rounded-lg'>
          <label className='flex gap-3 justify-between'>
            <legend className="text-wrap">Frequência de aeróbicos (por semana):</legend>
            <input name="freqAerobico" min={0} max={28} type="number" value={form.freqAerobico} onChange={handleChange} className="w-[75px] bg-transparent border-b-2 border-black" />
          </label>

          <label className='flex gap-3 justify-between'>
            <legend className="text-wrap">Duração média dos aeróbicos (min):</legend>
            <input name="duracaoAerobico" min={0} max={1000} type="number" value={form.duracaoAerobico} onChange={handleChange} className="w-[75px] bg-transparent border-b-2 border-black" />
          </label>

          <fieldset>
            <div className="flex gap-2 w-full justify-between pr-2">
              <legend className="">Intensidade dos aeróbicos:</legend>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="intensidadeAerobico"
                  value={0}
                  checked={form.intensidadeAerobico === 0}
                  onChange={(e) => setForm({ ...form, intensidadeAerobico: Number(e.target.value) })}
                />
                Leve
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="intensidadeAerobico"
                  value={1}
                  checked={form.intensidadeAerobico === 1}
                  onChange={(e) => setForm({ ...form, intensidadeAerobico: Number(e.target.value) })}
                />
                Moderada
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="intensidadeAerobico"
                  value={2}
                  checked={form.intensidadeAerobico === 2}
                  onChange={(e) => setForm({ ...form, intensidadeAerobico: Number(e.target.value) })}
                />
                Alta
              </label>
            </div>
          </fieldset>
        </div>
      </div>

      <button
        onClick={calcularTDEE}
        className="mt-6 bg-primary-green text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calcular TDEE
      </button>

      {resultado && (
        <div className="mt-4 text-lg">
          <strong>Seu TDEE é:</strong> {resultado} kcal/dia
        </div>
      )}
      {TMB && (
        <div className="mt-4 text-lg">
          <strong>Seu TMB é:</strong> {TMB} kcal/dia
        </div>
      )}
    </div>
  );
}



export default UserCalculator