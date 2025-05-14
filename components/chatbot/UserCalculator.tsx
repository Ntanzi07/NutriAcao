'use client'

import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { Dialog, Separator } from 'radix-ui';
import React, { use, useState } from 'react'

type Props = {}

const UserCalculator = (props: Props) => {
  const user = useQuery(api.my.get);

  const [customOption1, setCustomOption1] = useState(0);
  const [customOption2, setCustomOption2] = useState(0);

  const updateUserinfos = useMutation(api.my.update);

  const [form, setForm] = useState({
    sexo: user?.sexo || "",
    peso: user?.peso || "",
    altura: user?.altura || "",
    idade: user?.idade || "",
    atividadeDiaria: user?.infos?.atividadeDiaria ||  -1,
    freqMusculacao: user?.infos?.freqMusculacao || "0",
    duracaoMusculacao: user?.infos?.duracaoMusculacao || "0",
    intensidadeMusculacao: user?.infos?.intensidadeMusculacao || -1,
    freqAerobico: user?.infos?.freqAerobico ||  "0",
    duracaoAerobico: user?.infos?.duracaoAerobico || "0",
    intensidadeAerobico: user?.infos?.intensidadeAerobico || -1,
    proteinaPorKg: user?.infos?.proteinaPorKg || -1,
    gorduraPorKg: user?.infos?.gorduraPorKg || -1,
  });

  const [result, setResult] = useState({
    carboidratos: user?.results?.carboidratos || 0,
    proteinas: user?.results?.proteinas || 0,
    gorduras: user?.results?.gorduras || 0,
    calorias: user?.results?.calorias || 0,
  });

  const [resultado, setResultado] = useState(user?.TDEE || 0);
  const [TMB, setTMB] = useState(user?.TMB || 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const calcularMacros = (tdee: number, peso: number) => {
    const proteinas = form.proteinaPorKg * peso;
    const gorduras = form.gorduraPorKg * peso;
    const kcalProteinas = proteinas * 4;
    const kcalGorduras = gorduras * 9;
    const kcalCarbos = tdee - (kcalProteinas + kcalGorduras);
    const carbos = kcalCarbos / 4;

    setResult({
      carboidratos: Math.round(proteinas),
      proteinas: Math.round(gorduras),
      gorduras: Math.round(carbos),
      calorias: Math.round(tdee)
    });
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
      proteinaPorKg,
      gorduraPorKg,
    } = form;

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    const idadeNum = parseInt(idade);
    const freqMusculacaoNum = parseInt(freqMusculacao);
    const duracaoMusculacaoNum = parseInt(duracaoMusculacao);
    const freqAerobicoNum = parseInt(freqAerobico);
    const duracaoAerobicoNum = parseInt(duracaoAerobico);

    // TMB
    const TMBupttaded = sexo === "masculino"
      ? 10 * pesoNum + 6.25 * alturaNum - 5 * idadeNum + 5
      : 10 * pesoNum + 6.25 * alturaNum - 5 * idadeNum - 161

    setTMB(TMBupttaded);

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

    const TDEE = TMBupttaded * multAtividade + kcalMusculacao + kcalAerobico;

    setResultado(Number.parseFloat(TDEE.toFixed(2)));

    calcularMacros(TDEE, pesoNum);

    updateUserinfos({
      idade,
      altura,
      sexo,
      peso,
      TMB: TMBupttaded,
      TDEE,
      results: result,
      infos: {
        atividadeDiaria: atividadeDiaria,
        freqMusculacao: freqMusculacao,
        duracaoMusculacao: duracaoMusculacao,
        intensidadeMusculacao: intensidadeMusculacao,
        freqAerobico: freqAerobico,
        duracaoAerobico: duracaoAerobico,
        intensidadeAerobico: intensidadeAerobico,
        proteinaPorKg: proteinaPorKg,
        gorduraPorKg: gorduraPorKg,
      }
    });

  };

  return (
    <section className="py-5 flex-1 padding-x flex flex-col">

      <div className='w-full my-10'>
        <h2 className='md:text-[1.5em] text-[1.4em] font-bold'>Seus Resultados</h2>
        <div className='flex gap-3 flex-wrap '>
          <div className="border-solid  border-[1px] flex-1 w-max rounded-2xl border-secondary-color p-5">
            <h3 className=''>TDEE</h3>
            <h2 className='text-[1.4em]'>{user?.TDEE?.toFixed(2)}</h2>
          </div>
          <div className="border-solid  border-[1px] flex-1 w-max rounded-2xl border-secondary-color p-5">
            <h3 className=''>TMB</h3>
            <h2 className='text-[1.4em]'>{user?.TMB}</h2>
          </div>
          <div className="border-solid  border-[1px] flex-1 w-max rounded-2xl border-secondary-color p-5">
            <h3 className=''>Idade</h3>
            <h2 className='text-[1.4em]'>{user?.idade}</h2>
          </div>
          <div className="border-solid  border-[1px] flex-1 w-max rounded-2xl border-secondary-color p-5">
            <h3 className=''>Peso</h3>
            <h2 className='text-[1.4em]'>{user?.peso}</h2>
          </div>
          <div className="border-solid  border-[1px] flex-1 w-max rounded-2xl border-secondary-color p-5">
            <h3 className=''>Altura</h3>
            <h2 className='text-[1.4em]'>{user?.altura}</h2>
          </div>
        </div>
      </div>

      <Dialog.Title className="md:text-[1.5em] text-[1.4em] font-bold">
        Calculadora de TDEE
      </Dialog.Title>
      <Separator.Root
        className="h-[1px] w-auto bg-secondary-color"
        decorative
        orientation="horizontal"
      />

      <div className="flex flex-col gap-2 mt-3 text-[1.1em]">
        <h2 className='font-semibold md:text-[1.4em] text-[1.2em]'>Passo 1: Dados Pessoais</h2>

        <div className='flex flex-col gap-5 sm:px-3 '>
          <fieldset>
            <div className="flex gap-2 w-full flex-wrap px-3 py-1 justify-between rounded-2xl border-solid border-[2px] border-secondary-color">
              <legend className="font-semibold sm:w-fit w-full ">Sexo:</legend>
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

          <div className='flex justify-between flex-wrap gap-5 '>
            <label className='flex items-center sm:w-fit w-full gap-2 px-3 py-1 justify-between rounded-2xl border-solid border-[2px] border-secondary-color'>
              <legend className="font-semibold ">Peso (kg):</legend>
              <input name="peso" min={0} max={400} type="number" value={form.peso} onChange={handleChange} className="w-[75px] bg-transparent border-l-2 px-2 border-secondary-color focus:outline-none focus:ring-0" />
            </label>
            <label className='flex items-center sm:w-fit w-full gap-2 px-3 py-1 justify-between rounded-2xl border-solid border-[2px] border-secondary-color'>
              <legend className="font-semibold ">Altura (cm):</legend>
              <input name="altura" min={0} max={260} type="number" value={form.altura} onChange={handleChange} className="w-[75px] bg-transparent border-l-2 px-2 border-secondary-color focus:outline-none focus:ring-0" />
            </label>

            <label className='flex items-center sm:w-fit w-full gap-2 px-3 py-1 justify-between rounded-2xl border-solid border-[2px] border-secondary-color'>
              <legend className="font-semibold ">Idade:</legend>
              <input name="idade" min={0} max={120} type="number" value={form.idade} onChange={handleChange} className="w-[75px] bg-transparent border-l-2 px-2 border-secondary-color focus:outline-none focus:ring-0" />
            </label>
          </div>
        </div>

        <h2 className='font-semibold md:text-[1.4em] text-[1.2em] mt-5'>Passo 2: Nível de Atividade e Musculação</h2>

        <div className='flex flex-col gap-3 sm:px-3 rounded-lg'>
          <fieldset>
            <div className='px-3 py-1 justify-between rounded-2xl border-solid border-[2px] border-secondary-color'>
              <legend className="font-semibold">Atividade diária:</legend>
              <div className="flex gap-2 w-full flex-wrap justify-between pr-2">
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
            </div>
          </fieldset>
          <label className='flex gap-3 justify-between px-2 py-1 rounded-2xl border-solid border-[2px] border-secondary-color'>
            <legend className="font-semibold text-wrap">Frequência de musculação (por semana):</legend>
            <input name="freqMusculacao" min={0} max={28} type="number" value={form.freqMusculacao} onChange={handleChange} className="w-[75px] bg-transparent border-l-2 px-2 border-secondary-color focus:outline-none focus:ring-0" />
          </label>

          <label className='flex gap-3 justify-between px-2 py-1 rounded-2xl border-solid border-[2px] border-secondary-color'>
            <legend className="font-semibold text-wrap">Duração média do treino de musculação (min):</legend>
            <input name="duracaoMusculacao" min={0} max={1000} type="number" value={form.duracaoMusculacao} onChange={handleChange} className="w-[75px] bg-transparent border-l-2 px-2 border-secondary-color focus:outline-none focus:ring-0" />
          </label>

          <fieldset>
            <div className="flex flex-wrap gap-2 w-full pr-2 px-3 py-1 justify-between rounded-2xl border-solid border-[2px] border-secondary-color">
              <legend className="font-semibold md:w-fit w-full">Intensidade da musculação:</legend>
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

        <h2 className='font-semibold md:text-[1.4em] text-[1.2em] mt-5'>Passo 3: Exercícios Aeróbicos</h2>

        <div className='flex flex-col gap-3 sm:px-3 rounded-lg'>
          <label className='flex gap-3 justify-between px-2 py-1 rounded-2xl border-solid border-[2px] border-secondary-color'>
            <legend className="text-wrap font-semibold">Frequência de aeróbicos (por semana):</legend>
            <input name="freqAerobico" min={0} max={28} type="number" value={form.freqAerobico} onChange={handleChange} className="w-[75px] bg-transparent border-l-2 px-2 border-secondary-color focus:outline-none focus:ring-0" />
          </label>

          <label className='flex gap-3 justify-between px-2 py-1 rounded-2xl border-solid border-[2px] border-secondary-color'>
            <legend className="text-wrap font-semibold">Duração média dos aeróbicos (min):</legend>
            <input name="duracaoAerobico" min={0} max={1000} type="number" value={form.duracaoAerobico} onChange={handleChange} className="w-[75px] bg-transparent border-l-2 px-2 border-secondary-color focus:outline-none focus:ring-0" />
          </label>

          <fieldset>
            <div className="flex gap-2 w-full pr-2 flex-wrap px-3 py-1 justify-between rounded-2xl border-solid border-[2px] border-secondary-color">
              <legend className="font-semibold md:w-fit w-full">Intensidade dos aeróbicos:</legend>
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

      <h2 className="md:text-[1.4em] text-[1.2em] font-bold mt-5">Seus macronutrientes :</h2>
      <Separator.Root
        className="h-[1px] my-2 w-auto bg-secondary-color"
        decorative
        orientation="horizontal"
      />
      <div className=' flex flex-col gap-3'>
        <fieldset>
          <div className="flex gap-2 w-full flex-wrap px-4 py-2 rounded-2xl justify-between border-solid border-[2px] border-secondary-color">
            <legend className="font-semibold">Proteína (4 calorias por grama):</legend>
            <div className='flex flex-col'>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="proteinaPorKg"
                  value={1.6}
                  checked={form.proteinaPorKg === 1.6}
                  onChange={(e) => setForm({ ...form, proteinaPorKg: Number(e.target.value) })}
                />
                1.6 gramas de proteína por kg
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="proteinaPorKg"
                  value={1.8}
                  checked={form.proteinaPorKg === 1.8}
                  onChange={(e) => setForm({ ...form, proteinaPorKg: Number(e.target.value) })}
                />
                1.8 gramas de proteína por kg
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="proteinaPorKg"
                  value={2}
                  checked={form.proteinaPorKg === 2}
                  onChange={(e) => setForm({ ...form, proteinaPorKg: Number(e.target.value) })}
                />
                2 gramas de proteína por kg
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="proteinaPorKg"
                  value={customOption1}
                  onChange={(e) => setForm({ ...form, proteinaPorKg: Number(e.target.value) })}
                />
                custom:
                <input min={0} max={100} type="number" onChange={(e) => {
                  setCustomOption1(Number(e.target.value))
                  setForm({ ...form, proteinaPorKg: Number(e.target.value) })
                }} className="w-[75px] bg-transparent border-l-2 px-2 border-secondary-color focus:outline-none focus:ring-0" />
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div className="flex gap-2 flex-wrap w-full px-4 py-2 rounded-2xl justify-between border-solid border-[2px] border-secondary-color">
            <legend className="font-semibold">Gordura (9 calorias por grama):</legend>
            <div className='flex flex-col'>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gorduraPorKg"
                  value={1.6}
                  checked={form.gorduraPorKg === 1.6}
                  onChange={(e) => setForm({ ...form, gorduraPorKg: Number(e.target.value) })}
                />
                0,5g de gordura por kg
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gorduraPorKg"
                  value={1.8}
                  checked={form.gorduraPorKg === 1.8}
                  onChange={(e) => setForm({ ...form, gorduraPorKg: Number(e.target.value) })}
                />
                0,7g de gordura por kg
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gorduraPorKg"
                  value={2}
                  checked={form.gorduraPorKg === 2}
                  onChange={(e) => setForm({ ...form, gorduraPorKg: Number(e.target.value) })}
                />
                1g de gordura por kg
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gorduraPorKg"
                  value={customOption2}
                  onChange={(e) => setForm({ ...form, gorduraPorKg: Number(e.target.value) })}
                />
                custom:
                <input min={0} max={100} type="number" onChange={(e) => {
                  setCustomOption2(Number(e.target.value))
                  setForm({ ...form, gorduraPorKg: Number(e.target.value) })
                }} className="w-[75px] bg-transparent border-l-2 px-2 border-secondary-color focus:outline-none focus:ring-0" />
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <button
        onClick={calcularTDEE}
        className="mt-6 bg-primary-color text-primary-bg px-4 py-2 rounded hover:bg-userText-bg hover:text-primary-color border-2 border-primary-color "
      >
        Calcular TDEE
      </button>

    </section>
  );
}



export default UserCalculator